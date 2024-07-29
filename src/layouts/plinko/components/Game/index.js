import React, { useEffect, useState, useCallback } from 'react';
import { useRef, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlinkoGameBody } from './components/GameBody';
import { random } from '../../../../utils/random'
import {
    Bodies,
    Composite,
    Engine,
    Events,
    Render,
    Runner,
    World
} from 'matter-js';
import { 
    incrementPlinkoRunning, 
    decrementPlinkoRunning, 
    addToPlinkoHistory 
} from '../../../../slices/game.slice';
import { config } from './config'
import {
    getMultiplierByLinesQnt,
    getMultiplierSound
} from './config/multipliers'

export const Game = forwardRef((props, ref) => {
    const {level, startfunc, endfunc} = props;
    const engine = Engine.create();
    const dispatch = useDispatch();
    const [lines, setLines] = useState(16);
    useImperativeHandle(ref, () => ({
        bet(type, betValue){
            addBall(type, betValue)
        }
    }));
    const incrementInGameBallsCount = () => {
        dispatch(incrementPlinkoRunning());
    }
    const decrementInGameBallsCount = () => {
        dispatch(decrementPlinkoRunning());
    }
    const addPlinkoHistory = (value) => {
        dispatch(addToPlinkoHistory(value))
    }
    const [lastMultipliers, setLastMultipliers] = useState([]);
    const {
        pins: pinsConfig,
        colors,
        ball: ballConfig,
        engine: engineConfig,
        world: worldConfig
    } = config

    const worldWidth = worldConfig.width;
    const worldHeight = worldConfig.height;
    useEffect(() => {
        engine.gravity.y = engineConfig.engineGravity;
        const element = document.getElementById('plinko')
        if (!element) return
        const render = Render.create({
            element: element,
            bounds: {
                max: {
                    y: worldHeight,
                    x: worldWidth
                },
                min: {
                    y: 0,
                    x: 0
                }
            },
            options: {
                background: colors.background,
                hasBounds: true,
                width: worldWidth,
                height: worldHeight,
                wireframes: false
            },
            engine
        })
        const runner = Runner.create()
        Runner.run(runner, engine)
        Render.run(render)
        return () => {
            World.clear(engine.world, true)
            Engine.clear(engine)
            render.canvas.remove()
            render.textures = {}
        }
    }, [level])

    const pins = [] //Body[]
    for (let l = 0; l < lines; l++) {
        const linePins = pinsConfig.startPins + l
        const lineWidth = linePins * pinsConfig.pinGap
        for (let i = 0; i < linePins; i++) {
            const pinX = worldWidth / 2 - lineWidth / 2 + i * pinsConfig.pinGap + pinsConfig.pinGap / 2
            const pinY = worldWidth / lines + l * pinsConfig.pinGap + pinsConfig.pinGap

            const pin = Bodies.circle(pinX, pinY, pinsConfig.pinSize, {
                label: `pin-${i}`,
                render: {
                    fillStyle: '#F5DCFF'
                },
                isStatic: true
            })
            pins.push(pin)
        }
    }
    const addInGameBall = () => {
        incrementInGameBallsCount()
    }
    const removeInGameBall = () => {
        decrementInGameBallsCount()
    }
    const saveHistory = (value) => {
        addPlinkoHistory(value)
    }

    const addBall = useCallback(
        (type, ballValue) => {
            addInGameBall()
            // const ballSound = new Audio(ballAudio)
            // ballSound.volume = 0.2
            // ballSound.currentTime = 0
            // ballSound.play()

            const minBallX = worldWidth / 2 - pinsConfig.pinSize * 3 + pinsConfig.pinGap
            const maxBallX = worldWidth / 2 - pinsConfig.pinSize * 3 - pinsConfig.pinGap + pinsConfig.pinGap / 2

            const ballX = random(minBallX, maxBallX)
            const ballColor = ballValue <= 0 ? colors.text : colors.purple
            const ball = Bodies.circle(ballX, 20, ballConfig.ballSize, {
                restitution: 1,
                friction: 0.1,
                label: `ball-${ballValue}-${type}`,
                id: new Date().getTime(),
                frictionAir: 0.05,
                collisionFilter: { group: -1 },
                render: { fillStyle: ballColor },
                isStatic: false
            })
            Composite.add(engine.world, ball)
            startfunc(type, ballValue)
        },
        [level]
    )
    const leftWall = Bodies.rectangle(
        worldWidth / 3 - pinsConfig.pinSize * pinsConfig.pinGap - pinsConfig.pinGap,
        worldWidth / 2 - pinsConfig.pinSize,
        worldWidth * 2,
        40,
        {
            angle: 90,
            render: { visible: false },
            isStatic: true
        }
    )
    const rightWall = Bodies.rectangle(
        worldWidth -
        pinsConfig.pinSize * pinsConfig.pinGap -
        pinsConfig.pinGap -
        pinsConfig.pinGap / 2,
        worldWidth / 2 - pinsConfig.pinSize,
        worldWidth * 2,
        40,
        {
            angle: -90,
            render: { visible: false },
            isStatic: true
        }
    )
    const floor = Bodies.rectangle(0, worldWidth + 10, worldWidth * 10, 40, {
        label: 'block-1',
        render: { visible: false },
        isStatic: true
    })
    const multipliers = getMultiplierByLinesQnt(level)
    const multipliersBodies = [] //Body[]
    let lastMultiplierX = worldWidth / 2 - (pinsConfig.pinGap / 2) * lines - pinsConfig.pinGap
    multipliers.forEach(multiplier => {
        const blockSize = pinsConfig.pinGap // height and width
        const multiplierBody = Bodies.rectangle(
            lastMultiplierX + blockSize,
            worldWidth / lines + lines * pinsConfig.pinGap + pinsConfig.pinGap,
            blockSize,
            blockSize,
            {
                label: multiplier.label,
                isStatic: true,
                render: {
                    sprite: {
                        xScale: 0.75,
                        yScale: 0.75,
                        texture: multiplier.img
                    }
                }
            }
        )
        lastMultiplierX = multiplierBody.position.x
        multipliersBodies.push(multiplierBody)
    })

    Composite.add(engine.world, [
        ...pins,
        ...multipliersBodies,
        leftWall,
        rightWall,
        floor
    ])

    async function onCollideWithMultiplier(ball, multiplier) {
        ball.collisionFilter.group = 2
        World.remove(engine.world, ball)
        removeInGameBall()
        const ballValue = ball.label.split('-')[1]
        const type = ball.label.split('-')[2]
        const multiplierValue = +multiplier.label.split('-')[1]

        const multiplierSong = new Audio(getMultiplierSound(multiplierValue))
        multiplierSong.currentTime = 0
        multiplierSong.volume = 0.2
        multiplierSong.play()
        setLastMultipliers(prev => [multiplierValue, prev[0], prev[1], prev[2]])
        
        saveHistory(multiplierValue)
        endfunc(type, ballValue, multiplierValue)

        // if (+ballValue <= 0) return
        // const newBalance = +ballValue * multiplierValue
    }
    async function onBodyCollision(event) {
        const pairs = event.pairs
        for (const pair of pairs) {
            const { bodyA, bodyB } = pair
            if (bodyB.label.includes('ball') && bodyA.label.includes('block'))
                await onCollideWithMultiplier(bodyB, bodyA)
        }
    }

    Events.on(engine, 'collisionActive', onBodyCollision)
    return (
        <PlinkoGameBody />
    )
})