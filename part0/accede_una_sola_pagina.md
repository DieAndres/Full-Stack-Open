```mermaid
sequenceDiagram
    participant browser
    participant server
   
    browser->>server: GET  https://studies.cs.helsinki.fi/exampleapp/spa    
    activate server
    Note right of server: Status code 304 Not Modified
    server-->>browser: HTML code
    deactivate server
   
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    Note right of server: Status code 304 Not Modified
    server-->>browser: main.css
    deactivate server
   
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    Note right of server: Status code 304 Not Modified
    server-->>browser: spa.js
    deactivate server
