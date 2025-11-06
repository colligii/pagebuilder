import { BaseComponent } from "../../page-builder/component/base-component";
import { TextComponent } from "../../page-builder/component/text-component";
import { ImageComponent } from '../../page-builder/component/image-component'
import { Css } from "../../page-builder/css";
import { PublicPath } from "../../page-builder/public-script/public";
import containerInfo from "../../components/containerInfo";
import missingDays from "../../components/missing-time";
import divider from "../../components/divider";
import { toggleButton } from "../../components/toggle-button";
import { heart } from "../../components/heart";
import { State } from "../../page-builder/script/state";
import registerCustomScript, { registerCreateFunction, registerSetInterval } from "../../page-builder/script";
import { ClosedComponent } from "../../page-builder/component/closed-component";
import { ToggleComponent } from "../../components/toggle-component";
import copyCode from "../../components/copyCode";
import { InjectHtmlComponent } from "../../page-builder/component/inject-html-component";
import pixInfo from "../../page-builder/component/pixInfo";
import { hlsJsComponent } from "../../page-builder/component/hjs-js.component";
import playListComponent from "../../page-builder/component/playlistComponent";
import confirmComponent from "../../page-builder/component/confirm-component";
import frame from "../../page-builder/component/frame.component";
import { canvasConfettiComponent } from "./canvas-confetti-js,component";

Css.registerCustomCss(`
    @font-face {
  font-family: 'Brittany Signature';
  font-style: normal;
  src: url(/public/BrittanySignature.woff2) format('woff2');
  }
  
    span, h1, h2, h3, h4, h5, h6 {
        color: rgb(0, 53, 122);
        font-family: sans-serif;
    }

    :root {
        --title-size: 2rem;
        --font-size: 14px;
        --line-height: 18px;
    }

    @media (min-width: 389px) {
        :root {
            --title-size: 2.2rem;
            --font-size: 16px;
            --line-height: 20px;
        }
    }
    
    @media (min-width: 436px) {
        :root {
            --title-size: 2.4rem;
            --font-size: 20px;
            --line-height: 24px;
        }
    }
  `
)

Css.registerCustomCss(`
    .loading {
        animation: rotate 1300ms ease-in-out infinite;
    }   
        
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        40% {
            transform: rotate(360deg);
        }
        60% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(720deg);
        }
    }
`)

Css.registerCustomCss(`
    .background {
  background-size: 100% auto !important;
  background-repeat: no-repeat;
  background-position: center;
}

.background.reverse {

    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
    filter: FlipV;
    -ms-filter: "FlipV";
}

.reverse-page .title {
    text-align: end;
}

@media (min-width: 0px) and (max-width: 299px) {
  .background {
    background-image: url('/public/background200.webp');
  }
}

/* 300px até 399px */
@media (min-width: 300px) and (max-width: 399px) {
  .background {
    background-image: url('/public/background300.webp');
  }
}

/* 400px até 499px */
@media (min-width: 400px) and (max-width: 499px) {
  .background {
    background-image: url('/public/background400.webp');
  }
}

/* 500px até 599px */
@media (min-width: 500px) and (max-width: 599px) {
  .background {
    background-image: url('/public/background500.webp');
  }
}

/* 600px até 699px */
@media (min-width: 600px) and (max-width: 699px) {
  .background {
    background-image: url('/public/background600.webp');
  }
}

/* 700px até 799px */
@media (min-width: 700px) and (max-width: 799px) {
  .background {
    background-image: url('/public/background700.webp');
  }
}

/* 800px até 899px */
@media (min-width: 800px) and (max-width: 899px) {
  .background {
    background-image: url('/public/background800.webp');
  }
}

/* 900px até 999px */
@media (min-width: 900px) and (max-width: 999px) {
  .background {
    background-image: url('/public/background900.webp');
  }
}

/* 1000px até 1099px */
@media (min-width: 1000px) and (max-width: 1099px) {
  .background {
    background-image: url('/public/background1000.webp');
  }
}

/* 1100px até 1199px */
@media (min-width: 1100px) and (max-width: 1199px) {
  .background {
    background-image: url('/public/background1100.webp');
  }
}

/* 1200px ou mais */
@media (min-width: 1200px) {
  .background {
    background-image: url('/public/background.webp');
  }
}
`)

PublicPath.cpToOutFolder('dancingScriptLatin.woff2')
PublicPath.cpToOutFolder('dancingScriptLatinExt.woff2')
PublicPath.cpToOutFolder('dancingScriptVietnamese.woff2')
PublicPath.cpToOutFolder('logo-black.png')

const days = new State(7);
const hour = new State(7);
const minute = new State(7);

const SUCCESS_DEPLOY_HTML = new State(
    new ClosedComponent({
        key: 'div',
        css: {

            display: 'flex',
            'align-items': 'center',
            position: 'fixed',
            'z-index': '1000',
            gap: '10px',
            bottom: '30px',
            left: '50%',
            padding: '10px',
            'border-radius': '10px',
            'background': '#87ab69',
            color: 'white',
            transform: 'translateX(-50%)'
        },
        components: [
            new TextComponent({
                key: 'span',
                properties: {
                    class: 'text-info'
                },
                css: {
                    color: 'white',
                },
                text: ''
            }),
            new TextComponent({
                key: 'button',
                properties: {
                    class: 'ok-btn'
                },
                css: {
                    background: 'white',
                    color: 'black',
                    padding: '8px',
                    border: 'none',
                    'border-radius': '10px',
                },
                text: 'Ok'
            })
        ]
    }).build().replace(/\n/ig, '')
)

const ERROR_DEPLOY_HTML = new State(
    new ClosedComponent({
        key: 'div',
        css: {
            display: 'flex',
            'align-items': 'center',
            position: 'fixed',
            'z-index': '1000',
            gap: '10px',
            bottom: '30px',
            left: '50%',
            padding: '10px',
            'border-radius': '10px',
            'background': '#ab6969ff',
            color: 'white',
            transform: 'translateX(-50%)'
        },
        components: [
            new TextComponent({
                key: 'span',
                properties: {
                    class: 'text-info'
                },
                css: {
                    color: 'white',
                },
                text: ''
            }),
            new TextComponent({
                key: 'button',
                properties: {
                    class: 'ok-btn'
                },
                css: {
                    background: 'white',
                    color: 'black',
                    padding: '8px',
                    border: 'none',
                    'border-radius': '10px',
                },
                text: 'Ok'
            })
        ]
    }).build().replace(/\n/ig, '')
)

console.log(SUCCESS_DEPLOY_HTML.getValue())

declare var calcWeddingDate: Function;
declare var successPopUp: Function;

registerCreateFunction(() => {
    const div = document.createElement('div');

    div.innerHTML = gstate[0];
    const text = div.querySelector('.text-info');
    const btn = div.querySelector('.ok-btn');
    text.textContent = message;

    document.body.appendChild(div);

    function finish() {
        clearTimeout(timeout);
        document.body.removeChild(div);
    }

    btn?.addEventListener('click', finish)

    let timeout = setTimeout(finish, 10000)
}, 'successPopUp', ['message'], [SUCCESS_DEPLOY_HTML])

registerCreateFunction(() => {
    const div = document.createElement('div');

    div.innerHTML = gstate[0];
    const text = div.querySelector('.text-info');
    const btn = div.querySelector('.ok-btn');
    text.textContent = message;

    document.body.appendChild(div);

    function finish() {
        clearTimeout(timeout);
        document.body.removeChild(div);
    }

    btn?.addEventListener('click', finish)

    let timeout = setTimeout(finish, 10000)
}, 'errorPopUp', ['message'], [ERROR_DEPLOY_HTML])

registerCustomScript(() => {
    const confettiCanvas = document.getElementById('confetti');
    window.myConfetti = window.confetti.create(confettiCanvas, { resize: true });
}, [])

registerCreateFunction(() => {
    const jsWeddingDate = new Date('2026-03-14T15:30:00.000');
    const date = new Date()

    const diffInMs = jsWeddingDate.getTime() - date.getTime();

    const MINUTE_IN_MS = 60 * 1000;
    const HOUR_IN_MS = 60 * MINUTE_IN_MS;
    const DAYS_IN_MS = 24 * HOUR_IN_MS;

    const days = Math.floor(diffInMs / DAYS_IN_MS);
    const hours = Math.floor((diffInMs - days * DAYS_IN_MS) / HOUR_IN_MS);
    const minutes = Math.ceil((diffInMs - (days * DAYS_IN_MS + hours * HOUR_IN_MS)) / MINUTE_IN_MS)

    gstate[0] = days;
    gstate[1] = String(hours).padStart(2, '0');
    gstate[2] = String(minutes).padStart(2, '0')

}, 'calcWeddingDate', [], [days, hour, minute])

registerSetInterval(() => {
    calcWeddingDate()
}, 1000)

registerCustomScript(() => {
    calcWeddingDate();
})

// https://www.mahevini.com.br/public/m3u8/playlist.m3u8
export default [
        new BaseComponent({
            key: 'div',

            css: {
                display: 'flex',
                overflow: 'hidden',
                width: '100%',
                height: '93dvh',
            },
            components: [
                new BaseComponent({
                    key: 'div',
                    css: {
                        width: '100%',
                        height: '93dvh',
                        background: "rgba(0,0,0,0.7)",
                        position: 'absolute',
                        'z-index': '20',
                        display: 'flex',
                        'justify-content': 'center',
                        'align-items': 'center'
                    },
                    components: [
                        new ImageComponent({
                            alt: 'Logo do casamento',
                            originalMediaPath: 'logo-sm.webp',
                            imgCss: {
                                position: 'absolute',
                                top: '20px'
                            }
                        }),
                        new TextComponent({
                            key: 'h1',
                            text: 'Bem vindos ao nosso dia!',
                            css: {
                                color: 'white',
                                'font-size': '2.5rem',
                                'overflow-wrap': 'anywhere',
                                'max-width': '240px',
                                'font-family': 'Brittany Signature',
                                'text-align': 'center'
                            }
                        })
                    ]
                }),
                new ImageComponent({
                    alt: 'Foto da mayara e vinicis',
                    originalMediaPath: 'mahevini-desk.jpeg',
                    quality: 70,
                    css: {
                        position: 'relative',
                        'z-index': '10',
                    },
                    imgCss: {
                        width: '100vw',
                        height: '100%',
                        'object-fit': 'cover'
                    },
                    breakpoints: [
                        {
                            maxWidth: 500,
                            breakpointWidth: 480,
                            srcset: 'mahevini.jpeg',
                            quality: 25
                        }
                    ]
                })
            ]
        }),
        frame(
            false,
            new BaseComponent({
                key: 'div',
                css: {
                    display: 'flex',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    padding: '1rem',
                    'margin-top': '-20px'
                },
                components: containerInfo({
                    title: 'Nossa história',
                    basecomponent: new BaseComponent({
                        key: 'div',
                        css: {
                            'width': '100%',
                            'display': 'flex',
                            'flex-direction': 'column'
                        },
                        components: [
                            playListComponent(),
                            new TextComponent({
                                key: 'span',
                                css: {
                                    'margin-left': '20px',
                                    'margin-right': '20px',
                                    'line-height': 'var(--line-height)',
                                    'text-align': 'center',
                                    'font-family': 'sans-serif',
                                    'font-size': 'var(--font-size)',
                                    'font-weight': 'bold',
                                    'margin-top': '28px'
                                },
                                text: 'Nos conhecemos e foi amor à primeira vista. Desde aquele instante, algo em nós sabia que estávamos destinados a caminhar juntos. Cada sorriso virou poesia, cada abraço, refúgio. O tempo mostrou que não era apenas encanto, mas um amor verdadeiro, que cresce e floresce a cada dia, transformando nossa história em eternidade.'.toUpperCase()
                            })
                        ]
                    }),
                    extraCssTitle: {
                        'padding-top': '40px',
                        'padding-left': '10px'
                    }
                })
            }),
        ),
        frame(
            true,
            new BaseComponent({
                key: 'div',
                css: {
                    display: 'flex',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    padding: '1rem',
                    'margin-top': '-20px',
                },
                components: containerInfo({
                    title: 'Contagem Regressiva',
                    basecomponent: new BaseComponent({
                        key: 'div',
                        css: {
                            'width': '100%',
                            'display': 'flex',
                            'flex-direction': 'column'
                        },
                        components: [
                            new TextComponent({
                                key: 'span',
                                css: {
                                    'font-size': 'var(--font-size)',
                                    'margin-top': '100px',
                                    'line-height': 'var(--line-height)',
                                    'align-self': 'center',
                                    'text-align': 'center',
                                    'width': '85%'
                                },
                                text: (('Contem conosco para o nosso grande dia! A cada amanhecer, nosso amor e nossa alegria só se multiplicam.'.toUpperCase().replace(' A CADA AMANHECER', '<br> A CADA AMANHECER')) + '<br><br> DIA: 14/03/2026 ÁS 15h30')
                            }),
                            new BaseComponent({
                                key: 'div',
                                css: {
                                    display: 'flex',
                                    'flex-direction': 'column',
                                    'align-items': 'center',
                                    padding: '1rem'
                                },
                                components: [missingDays(days, hour, minute)]
                            }),
                            new BaseComponent({
                                key: 'img',
                                css: {
                                    width: '70%',
                                    'max-width': '300px',
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0'
                                },
                                properties: {
                                    src: '/public/happy-leopard.gif',
                                    loading: 'lazy'
                                }
                            })
                        ]
                    }),
                    extraCssTitle: {
                        'padding-top': '40px',
                        'padding-left': '10px'
                    }
                })
            }),
        ),
frame(
    false,
            new BaseComponent({
                key: 'div',
                css: {
                    display: 'flex',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    padding: '1rem',
                    'margin-top': '-20px',
                },
                components: containerInfo({
                    title: 'Detalhes da cerimônia ',
                    subTitle: 'Onde vamos celebrar o início da nossa nova jornada juntos!'.toUpperCase(),
                    basecomponent: new BaseComponent({
                        key: 'div',
                        css: {
                            'width': '100%',
                            'display': 'flex',
                            'flex-direction': 'column'
                        },
                        components: [
                            new ToggleComponent()
                        ]
                    }),
                    extraCssTitle: {
                        'padding-top': '80px',
                        'padding-left': '10px'
                    }
                })
            }),
        ),
        frame(
            true,
            new BaseComponent({
                key: 'div',
                css: {
                    display: 'flex',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    padding: '1rem',
                    height: '100%',
                    flex: '1',
                    'margin-top': '-20px',
                },
                components: containerInfo({
                    title: 'Confirme a sua presença',
                    subTitle: 'Sua presença tornará nosso dia ainda mais especial! confirme até 14/01/2026 as 00:00'.toUpperCase().replace(' CONFIRME', ' <br><br>CONFIRME'),
                    basecomponent: new BaseComponent({
                        key: 'div',
                        css: {
                            'width': '100%',
                            'display': 'flex',
                            'flex-direction': 'column',
                            'flex': '1'
                        },
                        components: [
                            confirmComponent()
                        ]
                    }),
                    extraCssTitle: {
                        'padding-top': '80px',
                        'padding-left': '10px'
                    },
                    extraCssContainer: {
                        flex: '1'
                    }
                })
            }),
        ),
        frame(false,
            new BaseComponent({
                key: 'div',
                css: {
                    display: 'flex',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    padding: '1rem',
                    'margin-top': '-20px',
                },
                components: containerInfo({
                    title: 'Lua de mel ou <br><br>Lua de boletos?',
                        subTitle: 'Para nossa lua ser de mel e não de boletos sinta-se a vontade de contribuir com o valor que desejar💌.'.toUpperCase().replace('SINTA-SE', '<br><br>SINTA-SE'),
                    basecomponent: new BaseComponent({
                        key: 'div',
                        css: {
                            'width': '100%',
                            'display': 'flex',
                            'flex-direction': 'column'
                        },
                        components: [
                            new ImageComponent({
                                    alt: 'Foto do vini com placa escrita ACEITAMOS PIX',
                                    originalMediaPath: 'vini_pix.png',
                                    quality: 80,
                                    width: 200,
                                    imgCss: {
                                        width: '200px',
                                        position: 'absolute',
                                        bottom: '0px',
                                        left: '50%',
                                        transform: 'translateX(-50%)'
                                    }
                                }),
                                copyCode('vinifranca10@outlook.com.br', 'Chave Pix:\t', { 'font-weight': 'bold' }),
                                new TextComponent({
                                    key: 'span',
                                    css: {
                                        'padding-top': '20px',
                                        'font-size': 'var(--font-size)',
                                        'text-align': 'center'
                                    },
                                    text: 'BANCO: ITAÚ | NOME: Vinicius de França do Carmo'
                                })
                        ]
                    }),
                    extraCssTitle: {
                        'padding-top': '30px',
                        'padding-left': '10px',
                    }
                })
            }),
        ),
        new BaseComponent({
            key: 'canvas',
            properties: {
                id: 'confetti',
            },
            css: {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                'pointer-events': 'none'
            }
        }),
        hlsJsComponent(),
        canvasConfettiComponent(),
        /**
         * 
        ...divider(),
        new BaseComponent({
            key: 'div',
            css: {
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                padding: '1rem'
            },
            components: containerInfo(
                'Detalhes da Cerimônia',
                'Onde vamos celebrar o início da nossa nova jornada juntos!',
                ,
            )
        }),
        ...divider(),
        new BaseComponent({
            key: 'div',
            css: {
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                padding: '1rem'
            },
            components: containerInfo(
                'Confirme sua presença',
                'Sua presença tornará nosso dia ainda mais especial — confirme até 25/12/2025 as 00:00',
                confirmComponent(),
            )
        }),
        ...divider(),
        new BaseComponent({
            key: 'div',
            css: {
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                padding: '1rem'
            },
            components: containerInfo(
                '🧳 3. Lua de mel ou lua de boleto?',
                'Estamos muito felizes 😊 em contar com a sua presença 🙌 e também com a sua contribuição 💝, para que nossa lua de mel 🌙💕 seja doce 🍯✨ e não uma lua de boletos 📄💸. Sinta-se à vontade 🤗 para contribuir com o valor que desejar 💌."',
                new BaseComponent({
                    key: 'div',
                    css: {
                        display: 'flex',
                        'flex-direction': 'column',
                        'align-items': 'center'
                    },
                    components: [
                        new BaseComponent({
                            key: 'div',
                            css: {
                                width: '250px',
                                background: '#cecece',
                                border: '1px solid #6d6d6d',
                                'border-radius': '10px',
                                'margin-top': '30px'
                            },
                            components: [
                                new ImageComponent({
                                    alt: 'Foto do vini com placa escrita ACEITAMOS PIX',
                                    originalMediaPath: 'vini_pix.png',
                                    quality: 80,
                                    width: 200
                                }),
                                new ClosedComponent({
                                    key: 'div',
                                    css: {
                                        padding: '20px 0px'
                                    },
                                    components: [
                                        pixInfo('Nome', 'Vinicius de França do Carmo'),
                                        pixInfo('Banco', 'Itaú'),
                                    ]
                                })
                            ]
                        }),
                        copyCode('vinifranca10@outlook.com.br', 'Chave Pix:\t', { 'font-weight': 'bold' })
                    ]
                }),
            )
        }),
         */
    ]