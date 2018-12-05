db.games.find().forEach(function (game) {
    if (game.players === undefined && game.Players !== undefined)
        game.players = game.Players;
    delete game.Players;
    if (game.name === undefined && game.Name !== undefined)
        game.name = game.Name;
    delete game.Name;
    db.games.save(game);
});