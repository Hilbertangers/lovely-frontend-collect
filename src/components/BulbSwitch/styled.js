import styled, { keyframes } from 'styled-components'

// 关键api是box-shadow和transform
const sparkFrame1 = keyframes`
    0% {
        right: -5px;
        height: 1px;
        width: 1px;
        opacity: 0;     
    }
    20% {
        right: 0px;
        height: 3px;
        width: 3px;
        opacity: 1;     
    }
    30% {
        right: -5px;
        height: 3px;
        width: 3px;
        opacity: 1;     
    }
    70% {
        height: 3px;
        width: 3px;
    }
    100% {
        right: -60px;
        bottom: 40px;
        opacity: 0;
    }
`
const sparkFrame2 = keyframes`
    0% {
        height: 3px;
        width: 3px;
        opacity: 0;     
    }
    30% {
        opacity: 1;     
    }
    100% {
        right: -20px;
        bottom: 100px;
        opacity: 0;
    }
`
const sparkFrame3 = keyframes`
    0% {
        opacity: 0;     
    }
    30% {
        height: 2px;
        width: 2px;
        opacity: 1;     
    }
    100% {
        left: 0px;
        bottom: 100px;
        opacity: 0;
        width: 3px;
        height: 3px;
    }
`
const sparkFrame4 = keyframes`
    0% {
        opacity: 0;     
    }
    30% {
        height: 2px;
        width: 2px;
        opacity: 1;     
    }
    100% {
        left: -20px;
        height: 3px;
        width: 3px;
        bottom: -10px;
        opacity: 0;
    }
`

export const SwitchWrapper = styled.div`
    width: 220px;
    height: 110px;
    position: relative;

    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        cursor: pointer;

        &:checked ~ label > .bulb {
            left: 120px;
            background: #a7694a;
            box-shadow: inset 0 0 1px 3px #a56758,
                inset 0 0 6px 8px #6b454f,
                0 20px 30px -10px rgba(0,0,0,0.4),
                0 0 30px 50px rgba(253,184,67,0.1);

            .bulb-center {
                background: #fef401;
                box-shadow: 0 0 2px 4px #fdb843,
                    0 0 0 8px #feed6b,
                    0 0 0 12px #fdec6a,
                    0 0 12px 18px #bca83c,
                    0 0 20px 22px #a1664a;
            }

            .filament {
                &:after,
                &:before {
                    border-color: #fef4d5;
                }
            }

            .spark {
                > div:nth-of-type(1) {
                    animation: ${sparkFrame1} 2s ease-in-out;
                    animation-delay: 0.4s;
                }
                > div:nth-of-type(2) {
                    animation: ${sparkFrame2} 2.4s ease-in-out;
                    animation-delay: 0.4s;
                }
                > div:nth-of-type(3) {
                    animation: ${sparkFrame3} 2s ease-in-out;
                    animation-delay: 0.9s;
                }
                > div:nth-of-type(4) {
                    animation: ${sparkFrame4} 1.7s ease-in-out;
                    animation-delay: 0.9s;
                }
            }
        }
    }
`

export const Switch = styled.label`
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background: #39315a;
    display: block;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.2),
        inset 0 0 5px -2px rgba(0,0,0,0.4);
`

export const Bulb = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #4a426b;
    position: relative;
    left: 10px;
    top: 10px;
    transition: 0.7s;
    box-shadow: inset 0 0 1px 3px #4a426b,
        inset 0 0 6px 8px #423963,
        0 20px 30px -10px rgba(0,0,0,0.4);
`

export const BulbCenter = styled.div`
    position: absolute;
    background: #7b7394;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transition: 0.7s;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 2px 4px #524a73, 0 0 0 8px #5a527b, 0 0 0 12px #635a84;
`

const Filament = styled.div`
    position: absolute;
    width: 35px;
    height: 35px;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    overflow: hidden;

    &:after,
    &:before {
        content: '';
        display: block;
        height: 6px;
        width: 17px;
        border-radius: 50%;
        border: 2px solid #4a426b;
        position: absolute;
        transition: 0.7s;
        top: -4px;
        left: -2px;
        transform: rotate(-10deg);
    }

    &:before {
        left: 15px;
        transform: rotate(10deg);
    }
`

export const FilamentLeft = styled(Filament)`
    transform: translate(-50%, -50%) rotate(-45deg);
`

export const FilamentRight = styled(Filament)`
    transform: translate(-50%, -50%) rotate(45deg);
`

// 原作者在反光这里对伪元素做了一些3d处理
export const Reflections = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 8;

    &:after {
        content: '';
        display: block;
        height: 80px;
        width: 50px;
        background-image: linear-gradient(80deg, rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.5));
        border-radius: 10% 20% 50% 30% / 30% 60% 30% 40%;
        position: absolute;
        transform: rotate(-35deg) skewx(-15deg) translate(10px, -20px);
        top: -8px;
        left: -5px;
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        height: 10px;
        width: 30px;
        background-image: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15));
        bottom: 10px;
        right: 0px;
        transform: rotate(45deg);
    }

    span {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-image: linear-gradient(-135deg, transparent 10%, rgba(255, 255, 255, 0.3));
        position: absolute;
        left: -40px;
        bottom: -45px;

        &:after {
            content: '';
            display: block;
            height: 35px;
            width: 20px;
            position: absolute;
            top: -36px;
            right: -40px;
            border-radius: 50%;
            box-shadow: 4px -2px 0 -3px rgba(255, 255, 255, 0.4);
            filter: blur(1px);
            transform: rotate(-10deg); 
        }
    }
`

const Spark = styled.div`
    background-color: #d1b82b;
    position: absolute;
    border-radius: 50%;
    transition: .4s;
    opacity: 0;
`

export const Spark1 = styled(Spark)`
    height: 1px;
    width: 1px;
    right: -5px;
    bottom: 23px;
`

export const Spark2 = styled(Spark)`
    height: 3px;
    width: 3px;
    right: 20px;
    bottom: 80px;
`

export const Spark3 = styled(Spark)`
    height: 3px;
    width: 3px;
    left: 20px;
    bottom: 80px;
`

export const Spark4 = styled(Spark)`
    height: 3px;
    width: 3px;
    left: 20px;
    bottom: 20px;
`