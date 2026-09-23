// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "map":
            case "level1":return tiles.createTilemap(hex`220011000404040404040404040404040404040404040404040404040404040404040404040404010101010101010101010101010101010101010101010101010101010101010104040102020202020202020202020202010102020202020202020202020202020201040401020202020202020202020202020101020202020202020202020202020202010404010202020202020202020202020201010202020202020202020202020202020104040102020202020202020202020202010102020202020202020202020202020201040401020202020202020202020202020101020202020202020202020202020202010404010202020202020202020202020202020202020202020202020202020202020104040102020202020203020202020202020202020202020202020202020202020201040401020202020202020202020202020202020202020202020202020202020202010404010202020202020202020202020201010202020202020202020202020202020104040102020202020202020202020202010102020202020202020202020202020201040401020202020202020202020202020101020202020202020202020202020202010404010202020202020202020202020201010202020202020202020202020202020104040102020202020202020202020202010102020202020202020202020202020201040401010101010101010101010101010101010101010101010101010101010101010404040404040404040404040404040404040404040404040404040404040404040404`, img`
..................................
.22222222222222222222222222222222.
.2.............22...............2.
.2.............22...............2.
.2.............22...............2.
.2.............22...............2.
.2.............22...............2.
.2..............................2.
.2..............................2.
.2..............................2.
.2.............22...............2.
.2.............22...............2.
.2.............22...............2.
.2.............22...............2.
.2.............22...............2.
.22222222222222222222222222222222.
..................................
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile3,myTiles.tile4,myTiles.tile5], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "wall":
            case "tile1":return tile1;
            case "floor":
            case "tile3":return tile3;
            case "spawn":
            case "tile4":return tile4;
            case "camerawall":
            case "tile5":return tile5;
            case "spawn 1w":
            case "tile2":return tile2;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
