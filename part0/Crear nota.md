```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: Payload: 'Hola mundo'
    Note right of server: Status Code 302 Found
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    Note right of server: Status Code 304 Not Modified
    server-->>browser: HTML
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    Note right of server: Status Code 304 Not Modified
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    Note right of server: Status Code 304 Not Modified
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: Se obtienen las notas almacenadas en el data.json

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    Note right of server: Status Code 304 Not Modified
    server-->>browser: [{ "content": "hola mundo","date": "2024-07-21T19:02:04.312Z"},{"content": "react", "date": "2024-07-21T19:04:05.529Z"}, ...]
    deactivate server

    Note right of browser: Se ejecuta la funcion para mostrar las notas