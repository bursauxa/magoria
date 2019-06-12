# magoria

Sample application with Mongo, .NET Core MVP, SignalR, Vue with strict TS.

## Prerequistes to run

- install .NET Core 2.1 SDK : [Linux](https://www.microsoft.com/net/download?initial-os=linux), [Windows](https://www.microsoft.com/net/download?initial-os=windows), [Mac](https://www.microsoft.com/net/download?initial-os=macos)
- use VS Code as your IDE if you want to take advantage of the included config & project files
- have a recent enough node/npm installation
- install MongoDB, the default installation should have it running on `localhost:27017` (can be changed in `DataSource.cs`)

## How to run

- prepare dependencies: execute `dotnet restore` in the `server` folder; execute `npm install` in the `client` folder
- in VS Code : **start debugging** will launch the server; **tasks > serve** will launch the client
- alternatively, from the command line: `dotnet run` in the `server` folder; `npm serve` in the `client` folder

## Port routing & CORS

For development on your own computer, it is possible to simply rewrite the URLs in `LobbyService.ts` to target `localhost:5000`, as well as add `localhost:6738` to accepted origins in `Startup.cs`.

The recommended solution is to proxy the services behind a HTTP proxy. This will not prevent nice development features, such as source mapping or live reload, from working. It can also be used on a production platform as long as it is single-instance.

To simplify this step, a nginx configuration is provided in the project. To use it, first install [nginx](https://www.nginx.com/), then run the following commands (`sudo` may be required):

```bash
cp ./nginx/magoria.nginx /etc/nginx/sites-available
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/magoria.nginx /etc/nginx/sites-enabled/
service nginx reload
```
