import { heart } from "../../components/heart";
import registerCustomScript, { registerCreateFunction } from "../script";
import { State } from "../script/state";
import { BaseComponent } from "./base-component";
import { ClosedComponent } from "./closed-component";
import { InjectHtmlComponent } from "./inject-html-component";
import { TextComponent } from "./text-component";
import { VoidComponent } from "./void-component";

let urlStatus = 'prod'

const status = new State(null);
const guestGroup = new State([]);
const guestGroupClone = new State([]);
const selectedGuestGroup = new State(null);
const guestList = new State([])

let URL;

if(urlStatus === 'machine') {
    URL = new State(`http://localhost:3000/`)
} else if(urlStatus === 'network') {
    URL = new State(`http://192.168.1.10:3000/`);
} else if(urlStatus === 'prod') {
    URL = new State(`https://api.mahevini.com.br/`)
}

registerCreateFunction(() => {
    return new Promise((resolve, reject) => {
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure it: GET request for a test API
        xhr.open("GET", url, true);

        // Set up a function to handle the response
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject("Request failed. Status:" + xhr.status);
            }
        };

        // Handle network errors
        xhr.onerror = function () {
            reject("Network error occurred.");
        };

        // Send the request
        xhr.send();
    })
}, 'getRequest', ['url'])

registerCreateFunction(() => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Configura como POST
        xhr.open("POST", url, true);

        // Define o header (geralmente application/json)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject("Request failed. Status:" + xhr.status);
            }
        };

        xhr.onerror = function () {
            reject("Network error occurred.");
        };

        // Envia os dados convertidos para JSON
        xhr.send(JSON.stringify(data));
    })
}, 'postRequest', ['url', 'data']);

const noResultsComponent = new State(new BaseComponent({
    key: 'div',
    css: {
        width: '100%',
        height: '100%',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',

    },
    components: [
        new TextComponent({
            key: 'span',
            css: {
                width: '80%',
                'text-align': 'center',
                'font-size': '14px',
                'font-weight': 'bold'
            },
            text: 'Digite seu nome, selecione seu grupo familiar e clique em Continuar; se não aparecer, contate-nos.'.toUpperCase()
        })
    ]
}).build())

const loadingComponent = new State(new BaseComponent({
    key: 'div',
    css: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        height: '100%'
    },
    components: [
        new InjectHtmlComponent({
            key: 'div',
            properties: {
                class: 'loading'
            },
            html: `<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 48 48" fill="none">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M19.4545 26.4444C17.6364 28.2222 15.8182 30 12.1818 30C8.54545 30 4 27.3333 4 22C4 16.6667 8.54545 14 12.1818 14C17.6364 14 20.3636 17.5556 24 22C27.6364 26.4444 30.3636 30 35.8182 30C39.4545 30 44 27.3333 44 22C44 16.6667 39.4545 14 35.8182 14C32.1818 14 29.4545 16.6667 28.5455 17.5556" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
        })
    ]
}).build())

const loadingComponentOverflow = new State(new BaseComponent({
    key: 'div',
    css: {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        height: '100%',
        position: 'absolute',
        'z-index': '100',
        top: '0',
        'gap': '6px',
        left: '0',
        background: '#00000049',
        width: '100%'
    },
    properties: {
        id: 'loading-component'
    },
    components: [
        new InjectHtmlComponent({
            key: 'div',
            properties: {
                class: 'loading'
            },
            html: `<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 48 48" fill="none">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M19.4545 26.4444C17.6364 28.2222 15.8182 30 12.1818 30C8.54545 30 4 27.3333 4 22C4 16.6667 8.54545 14 12.1818 14C17.6364 14 20.3636 17.5556 24 22C27.6364 26.4444 30.3636 30 35.8182 30C39.4545 30 44 27.3333 44 22C44 16.6667 39.4545 14 35.8182 14C32.1818 14 29.4545 16.6667 28.5455 17.5556" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
        }),
        new TextComponent({
            key: 'span',
            properties: {
                id: 'span-loading-overflow'
            },
            css: {
                color: 'white'
            },
            text: ''
        })
    ]
}).build())

const guestGroupComponent = new State(new BaseComponent({
    key: 'div',
    css: {
        padding: '8px',
        display: 'flex',
        'flex-direction': 'column',
        height: '80%'
    },
    components: [
        new VoidComponent({
            key: 'input',
            properties: {
                id: 'search-bar',
                placeholder: 'Seu nome do convite'
            },
            css: {
                width: '100%',
                outline: 'none',
                'font-size': '16px',
                padding: '4px',
                border: '2px solid black',
                'border-radius': "6px",
                background: 'none',
            }
        }),
        new ClosedComponent({
            key: 'div',
            css: {
                flex: '1',
                overflow: 'auto',
                padding: '6px',
                'font-size': '16px'
            },
            properties: {
                id: 'guest-group-list',
            }
        }),
        new TextComponent({
            key: 'button',
            text: 'CONTINUAR',
            properties: {
                id: 'confirm-selection'
            },
            css: {
                'font-weight': 'bold',
                border: 'none',
                padding: '10px',
                background: 'rgb(0, 53, 122)',
                outline: 'none',
                color: 'white',
                'font-family': 'sans-serif',
                'border-radius': '6px',
            }
        })
    ]
}).build())

const guestConfirmComponent = new State(new BaseComponent({
    key: 'div',
    properties: {
        id: 'guest-confirm'
    },
    css: {
        padding: '8px',
        display: 'flex',
        'flex-direction': 'column',
        height: '80%'
    },
    components: [
        new ClosedComponent({
            key: 'div',
            css: {
                display: 'flex',
                'flex-direction': 'column',
                flex: '1',
                overflow: 'auto',
                padding: '6px',
                'gap': '10px',
                'overflow-y': 'auto'
            },
            properties: {
                id: 'guest-confirm-list',
            }
        }),
        new ClosedComponent({
            key: 'div',
            css: {
                display: 'flex',
                gap: '4px'
            },
            components: [
                new TextComponent({
                    key: 'button',
                    text: 'VOLTAR',
                    properties: {
                        id: 'back-selection'
                    },
                    css: {
                        'font-weight': 'bold',
                        border: 'none',
                        'width': '100%',
                        padding: '10px',
                        background: 'rgb(0, 53, 122)',
                        outline: 'none',
                        color: 'white',
                        'font-family': 'sans-serif',
                        'border-radius': '6px',
                    }
                })
            ]
        })
    ]
}).build())

const guestGroupComponentList = new State(new TextComponent({
    key: 'div',
    properties: {
        class: 'list-item'
    },
    css: {
        padding: '8px',
        display: 'flex',
        'flex-direction': 'column',
        cursor: 'pointer',
        'border-radius': '10px'
    },
    text: ''
}).build())

const guestItemComponentList = new State(new BaseComponent({
    key: 'div',
    properties: {
        class: 'guest-item'
    },
    css: {
        padding: '12px',
        display: 'flex',
        'flex-direction': 'column',
        cursor: 'pointer',
        gap: '8px',
        'border-radius': '10px'
    },
    components: [
        new TextComponent({
            key: 'span',
            css: {
                'text-align': 'center',
                'width': '100%',
                'font-size': '18px',
                'font-weight': 'bold'
            },
            properties: {
                'class': 'invite-name'
            },
            text: ''
        }),
        new BaseComponent({
            key: 'div',
            css: {
                display: 'flex',
                gap: '2px',
            },
            components: [
                new TextComponent({
                    key: 'button',
                    properties: {
                        class: 'confirm-btn'
                    },
                    css: {
                        flex: '1',
                        'font-weight': 'bold',
                        border: 'none',
                        'width': '100%',
                        padding: '4px',
                        outline: 'none',
                        'font-family': 'sans-serif',
                        'border-radius': '6px'
                    },
                    text: 'CONFIRMAR'
                }),

                new TextComponent({
                    key: 'button',
                    properties: {
                        class: 'not-confirm-btn'
                    },
                    css: {
                        flex: '1',
                        
                        'font-weight': 'bold',
                        border: 'none',
                        'width': '100%',
                        padding: '4px',
                        outline: 'none',
                        'font-family': 'sans-serif',
                        'border-radius': '6px'
                    },
                    text: 'NÃO CONFIRMAR'
                })
            ]
        })
    ]
}).build())

registerCreateFunction(() => {
    const mainSel = document.querySelector('#confirm-presence');
    mainSel.innerHTML = gstate[0];
}, 'handleLoading', [], [loadingComponent])

registerCreateFunction(() => {
    const mainSel = document.querySelector('#confirm-presence');
    mainSel.innerHTML = gstate[1];

    const selectList = mainSel.querySelector('#guest-group-list');
    const confirmSelection = mainSel.querySelector('#confirm-selection');

    selectList.innerHTML = '';

    const input = mainSel.querySelector('#search-bar');

    input.addEventListener('input', () => {
        const filterGuestGroup = gstate[2].filter(guestGroup => {
            const regexInput = new RegExp(normalizeText(input.value), 'ig');
            const splittedInput = input.value.split(' ');
                return (
                input?.value.length &&
                (
                    guestGroup.guest.some(guest => regexInput.test(normalizeText(guest.name))) &&
                    (splittedInput.length === 1 ? guestGroup.guest.some(guest => normalizeText(guest.name).split(' ').some(name => (normalizeText(splittedInput[0]) === name))) : true)
                )
                )
            
        });

        gstate[0] = filterGuestGroup.length > 5 ? [] : filterGuestGroup; 
        selectList.innerHTML = '';

        renderGuestGroupList(gstate[0])

    })

    confirmSelection.addEventListener('click', () => {
        if(!gstate[3]?.length)
            return errorPopUp('Digite o codigo e selecione um grupo pra continuar!');

        getGroupById()
    })
    gstate[0] = [];
    renderGuestGroupList(gstate[0])

}, 'handleGuestGroup', [], [guestGroup, guestGroupComponent, guestGroupClone, selectedGuestGroup])


registerCreateFunction(() => {
    return  text
                .trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
}, 'normalizeText', ['text'], [])

registerCreateFunction(() => {
    const mainSel = document.querySelector('#confirm-presence');
    mainSel.innerHTML = gstate[1];

    const selectList = mainSel.querySelector('#guest-confirm-list');
    const backSelection = mainSel.querySelector('#back-selection');

    selectList.innerHTML = '';

    renderGuestItemList();

    backSelection?.addEventListener('click', () => {
        changeStatus('guest-group')
    })

}, 'handleGuestConfirm', [], [guestGroup, guestConfirmComponent, guestGroupClone])


registerCreateFunction(() => {
    const selectList = document.querySelector('#guest-group-list');

    if(!list?.length) {
        selectList.innerHTML = gstate[2];
        return;
    }

    for (let guestGroup of list) {
        const div = document.createElement("div");
        div.innerHTML = gstate[0];
        div.querySelector('.list-item').textContent = guestGroup.groupName;
        
        div.querySelector('.list-item').addEventListener('click', () => {
            gstate[1] = guestGroup.id;
            const selected = document.querySelector('.list-item[selected]');
            div.querySelector('.list-item').setAttribute('selected', 'true');
            if(selected) {
                selected.removeAttribute('selected');
                selected.style.background = null;
            }
            div.querySelector('.list-item').style.background = '#a3a3a3ff'
        })
        selectList.append(div);
    }
}, 'renderGuestGroupList', ['list'], [guestGroupComponentList, selectedGuestGroup, noResultsComponent])


registerCreateFunction(() => {
    if(confirmed === true) {
        div.style.background = '#32f10b65';
    } else if(confirmed === false) {
        div.style.background = '#da151565';
    }
}, 'confirmedColor', ['div', 'confirmed'], [])

registerCreateFunction(() => {
    const selectList = document.querySelector('#guest-confirm-list');
    const wrapper = document.querySelector('#guest-confirm');

    for (let guest of gstate[1]) {
        const div = document.createElement("div");
        div.innerHTML = gstate[0];
        div.querySelector('.invite-name').textContent = guest.name;
        confirmedColor(div.querySelector('.guest-item'), guest.confirmed)

        changeBtnColor(div, guest);

        
        div.querySelector('.confirm-btn').addEventListener('click', () => {
            if(guest.confirmed)
                return successPopUp('Convidado já confirmado!');
            
            const confirmed = true;
            const loadingDiv = document.createElement('div');
            loadingDiv.innerHTML = gstate[2];
            
            loadingDiv.style.position = 'absolute';
            loadingDiv.style.width = '100%';
            loadingDiv.style.height = '100%';
            loadingDiv.style.top = '0';
            loadingDiv.style.left = '0';

            if(confirmed) {
                loadingDiv.querySelector('#span-loading-overflow').textContent = 'Confirmando convidado, aguarde'
            } else {
                loadingDiv.querySelector('#span-loading-overflow').textContent = 'Cancelando presença, aguarde'
            }

            wrapper?.append(loadingDiv);
            confirmSelection(guest.id, confirmed)
                .then(() => {
                    confirmedColor(div.querySelector('.guest-item'), confirmed);
                    guest.confirmed = confirmed;

                    changeBtnColor(div, guest);
                    if(confirmed) {
                        successPopUp(`Convidado confirmado com sucesso`)
                        window.myConfetti({
                            particleCount: 200,
                            spread: 180,
                            startVelocity: 30,
                            origin: { y: 0.6 }
                        });
                    } else {
                        successPopUp(`Você cancelou sua presença com sucesso.`)
                    }

                    loadingDiv.remove();
                    console.log('confirmed')
                })
                .catch(console.log)
        })

        div.querySelector('.not-confirm-btn').addEventListener('click', () => {
            if(guest.confirmed === false)
                return successPopUp('Convidado já marcado como não confirmado!');
            
            const confirmed = false;
            const loadingDiv = document.createElement('div');
            loadingDiv.innerHTML = gstate[2];
            
            loadingDiv.style.position = 'absolute';
            loadingDiv.style.width = '100%';
            loadingDiv.style.height = '100%';
            loadingDiv.style.top = '0';
            loadingDiv.style.left = '0';

            if(confirmed) {
                loadingDiv.querySelector('#span-loading-overflow').textContent = 'Confirmando convidado, aguarde'
            } else {
                loadingDiv.querySelector('#span-loading-overflow').textContent = 'Cancelando presença, aguarde'
            }

            wrapper?.append(loadingDiv);
            confirmSelection(guest.id, confirmed)
                .then(() => {
                    confirmedColor(div.querySelector('.guest-item'), confirmed);
                    guest.confirmed = confirmed;
                    changeBtnColor(div, guest);
                    if(confirmed) {
                        successPopUp(`Convidado confirmado com sucesso`)
                        window.myConfetti({
                            particleCount: 200,
                            spread: 180,
                            startVelocity: 30,
                            origin: { y: 0.6 }
                        });
                    } else {
                        successPopUp(`Você cancelou sua presença com sucesso.`)
                    }

                    loadingDiv.remove();
                    console.log('confirmed')
                })
                .catch(console.log)
        })

        selectList.append(div);
    }
}, 'renderGuestItemList',[], [guestItemComponentList, guestList, loadingComponentOverflow])


registerCreateFunction(() => {

    if(guest.confirmed) {
            div.querySelector('.not-confirm-btn').style.background = 'white';    
            div.querySelector('.not-confirm-btn').style.color = 'black';
               
            div.querySelector('.confirm-btn').style.background = 'rgba(0, 122, 0, 1)';    
            div.querySelector('.confirm-btn').style.color = 'white';    
        } else if(guest.confirmed === false) {
            div.querySelector('.confirm-btn').style.background = 'white';    
            div.querySelector('.confirm-btn').style.color = 'black';

            div.querySelector('.not-confirm-btn').style.background = 'rgba(204, 3, 19, 1)';    
            div.querySelector('.not-confirm-btn').style.color = 'white';    
        }

}, 'changeBtnColor', ['div', 'guest'], [])

/**
 * 
 */

registerCreateFunction(() => {
    gstate[0] = status;
    if (status === 'loading') {
        handleLoading();
    } else if (status === 'guest-group') {
        gstate[1] = gstate[2];
        handleGuestGroup();
    } else if (status === 'guest-confirm') {
        handleGuestConfirm();
    }
}, 'changeStatus', ['status'], [status, guestGroup, guestGroupClone])

registerCustomScript(() => {
    window.addEventListener('load', () => {
        changeStatus('loading');
        getRequest(gstate[0] + 'guest-group/all')
            .then((data) => {
                gstate[1] = Array.isArray(data) ? data : [];
                gstate[2] = gstate[1];
                changeStatus('guest-group');
            })
            .catch(console.log)
    })
}, [URL, guestGroup, guestGroupClone])

registerCreateFunction(() => {
    changeStatus('loading');
    getRequest(gstate[0] + 'guest/guest-group/' + gstate[1])
        .then((data) => {
            gstate[2] = data;
            changeStatus('guest-confirm');
        })
        .catch(console.log)
}, 'getGroupById', [], [URL, selectedGuestGroup, guestList])


registerCreateFunction(() => {
    return postRequest(gstate[0] + 'guest/confirm/' + id, { confirmed })
}, 'confirmSelection', ['id', 'confirmed'], [URL, selectedGuestGroup, guestList])

export default function confirmComponent() {
    return new BaseComponent({
        key: 'div',
        css: {
            flex: '1',
            width: '100%',
            height: '100%',
            display: 'flex',
            'justify-content': 'center'
        },
        components: [
            new BaseComponent({
                key: 'div',
                properties: {
                    id: 'confirm-presence'
                },
                css: {
                    'font-family': 'sans-serif',
                    width: '80%',
                    'align-self': 'center',
                    'font-size': 'var(--font-size)',
                    overflow: 'hidden',
                    position: 'relative',
                    'border-radius': '10px',
                    'margin-top': '-15px',
                    'height': '80%',
                },
                components: [

                ]
            })
        ]

    })
}