# magoria
Sample application with Mongo, .NET Core MVP, SignalR, Vue with strict TS.

## Prerequistes to run
- install .NET Core 2.1 SDK : https://www.microsoft.com/net/download/linux (or /windows, /macos)
- use VS Code as your IDE if you want to take advantage of the included config & project files
- have a recent enough node/npm installation

## Port routing & CORS
For development on your own computer, it is possible to simply rewrite the URLs in `LobbyService.ts` to target `localhost:5000`, as well as add `localhost:8080` to accepted origins in `Startup.cs`.

Alternatively, if you want it to work on the network (from other computers), a nginx configuration is provided. First install nginx, then run the following commands:
```
cp ./nginx/magoria.nginx /etc/nginx/sites-available
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/magoria.nginx /etc/nginx/sites-enabled/
service nginx reload
```