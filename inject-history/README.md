# Inject History

Prototype injecting history to a browsing session.

## Setup
Copy `history.html` and `simple-http-server.py` into the same directory. Then
run:

```
python ./simple-http-server.py
```

This brings up a web server at `locahost:8000`.

## Test
Visit `http://locahost:8000/history.html` in any browser. This should inject 3
history entries into your current browser session:

```
apple.com
amazon.com <-- current page
wikipedia.org
```
