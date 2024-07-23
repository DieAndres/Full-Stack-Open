```mermaid
    
sequenceDiagram
    participant browser
    participant server
   
    browser->>server: POST  https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Status code 201 Created
    server-->>browser: JSON {"message":"note created"}
    deactivate server
