namespace SpriteKind {
    export const Other = SpriteKind.create()
    export const Overlay = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const Shield = SpriteKind.create()
}
browserEvents.CapsLock.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(shield, "equipped"))) {
        shield.setFlag(SpriteFlag.Invisible, false)
        sprites.setDataBoolean(shield, "equipped", true)
    }
})
function summon_enim (img2: Image, spawn: tiles.Location, facing_direction: number, N: number, room: number) {
    enim = sprites.create(img2, SpriteKind.Enemy)
    tiles.placeOnTile(enim, spawn)
    spriteFx.faceDirection(enim, facing_direction)
    sprites.setDataNumber(enim, "room", room)
    sprites.setDataNumber(enim, "charge", 0)
    sprites.setDataNumber(enim, "run", 0)
    statusbar = statusbars.create(9, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(enim, 1, 0)
    statusbar.setColor(2, 15, 3)
    if (N == 1) {
        statusbar.max = 13
        statusbar.value = 13
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(0, 0)
    hp += -1
    if (sprites.readDataBoolean(sprite, "explode")) {
        sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        sprite.x += -15.5
        sprite.y += -15.5
        sprite.setImage(assets.image`explode`)
        sprite.setKind(SpriteKind.Explosion)
        timer.after(50, function () {
            sprites.destroy(sprite)
        })
    } else {
        sprites.destroy(sprite)
    }
})
function draw_arc (image2: Image, cx: number, cy: number, mar: number, mir: number, sa: number, ea: number, c: number) {
    slice = image.create(2 * mar + 1, 2 * mar + 1)
    for (let k = sa; k <= ea; k++) {
        let rad2 = spriteutils.degreesToRadians(k)
        let cosVal2 = Math.cos(rad2)
        let sinVal2 = -Math.sin(rad2)
        for (let index2 = mir; index2 <= mar; index2++) {
            slice.setPixel(Math.round(cosVal2 * index2 + mar), Math.round(sinVal2 * index2 + mar), c)
        }
    }
spriteutils.drawTransparentImage(slice, image2, cx - mar, cy - mar)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`floor`, function (sprite, location) {
    if (custom.within(22, location.column, 31) && custom.within(2, location.row, 14) && room == 0) {
        room = 1
        tiles.setTileAt(tiles.getTileLocation(15, 7), assets.tile`camerawall`)
        tiles.setTileAt(tiles.getTileLocation(15, 8), assets.tile`camerawall`)
        tiles.setTileAt(tiles.getTileLocation(15, 9), assets.tile`camerawall`)
        tiles.setTileAt(tiles.getTileLocation(16, 7), assets.tile`wall`)
        tiles.setTileAt(tiles.getTileLocation(16, 8), assets.tile`wall`)
        tiles.setTileAt(tiles.getTileLocation(16, 9), assets.tile`wall`)
        tiles.setWallAt(tiles.getTileLocation(16, 7), true)
        tiles.setWallAt(tiles.getTileLocation(16, 8), true)
        tiles.setWallAt(tiles.getTileLocation(16, 9), true)
    }
})
function stamina_nonrate_consumption (stam: number, consump: number) {
    stamina = stam
    stamina_drain = consump
}
spriteutils.addEventHandler(spriteutils.UpdatePriorityModifier.After, spriteutils.UpdatePriority.FollowSprite, function () {
    if (0 < jump) {
        link.setVelocity(linkV[0], linkV[1])
    }
})
browserEvents.Shift.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(shield, "equipped"))) {
        shield.setFlag(SpriteFlag.Invisible, true)
        sprites.setDataBoolean(shield, "equipped", false)
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo())
})
function place_at (angle: number, around: Sprite, distance: number, to_place: Sprite) {
    spriteFx.setRotation(to_place, angle)
    spriteutils.placeAngleFrom(
    to_place,
    spriteutils.degreesToRadians(targetRotation),
    distance,
    around
    )
}
browserEvents.Space.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(jump)) {
        if (browserEvents.Shift.isPressed()) {
            super_jump = 0.75
        }
        jump = 0.75
        linkV = [link.vx, link.vy]
        timer.after(750, function () {
            link.setVelocity(0, 0)
        })
    }
})
sprites.onOverlap(SpriteKind.Weapon, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(sprite, "damage") && sprites.readDataSprite(sprite, "damaged") != otherSprite) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value -= (sprites.readDataNumber(sprite, "power"))
if (sprites.readDataNumber(sprite, "combo") == 4) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value -= (sprites.readDataNumber(sprite, "power"))/2
        }
        sprites.setDataSprite(sprite, "damaged", otherSprite)
    }
})
function draw_slice (image2: Image, cx: number, cy: number, r: number, sa: number, ea: number, c: number) {
    slice = image.create(2 * r + 1, 2 * r + 1)
    for (let j = sa; j <= ea; j++) {
        let rad = spriteutils.degreesToRadians(j)
        let cosVal = Math.cos(rad)
        let sinVal = -Math.sin(rad)
        for (let index = 0; index <= r; index++) {
            slice.setPixel(Math.round(cosVal * index + r), Math.round(sinVal * index + r), c)
        }
    }
spriteutils.drawTransparentImage(slice, image2, cx - r, cy - r)
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Released, function (x, y) {
    if (sprites.readDataNumber(sword, "charge") < 1) {
        // Only register a click if Link is NOT currently mid-swing
        if (!(sprites.readDataBoolean(sword, "damage"))) {
            if (jump > 0 && !(sprites.readDataNumber(sword, "combo") == 5)) {
                jump = 0.375
                // Save state to sprite data
                sprites.setDataNumber(sword, "combo", 5)
                // Lock swing input during active animation
                sprites.setDataBoolean(sword, "damage", true)
                // Lock swing input during active animation
                sprites.setDataBoolean(sword, "equipped", true)
                sword.setFlag(SpriteFlag.Invisible, false)
                timer.after(375, function () {
                    sprites.setDataBoolean(sword, "damage", false)
                    mySprite = sprites.create(assets.image`empty 15x15`, SpriteKind.Weapon)
                    sprites.setDataNumber(mySprite, "power", sprites.readDataNumber(sword, "power"))
                    spriteutils.placeAngleFrom(
                    mySprite,
                    spriteutils.degreesToRadians(spriteFx.rotation(link)),
                    20,
                    link
                    )
                    animation.runImageAnimation(
                    mySprite,
                    assets.animation`shockwave`,
                    50,
                    false
                    )
                    timer.after(250, function () {
                        sprites.destroy(mySprite)
                    })
                })
                timer.after(500, function () {
                    // Save state to sprite data
                    sprites.setDataNumber(sword, "combo", 0)
                })
            } else {
                if (sprites.readDataBoolean(sword, "equipped") || browserEvents.Shift.isPressed()) {
                    // 1. Advance combo (1, 2, 3, 4)
                    currentCombo = sprites.readDataNumber(sword, "combo") + 1
                    if (currentCombo > 4) {
                        currentCombo = 1
                    }
                    // Save state to sprite data
                    sprites.setDataNumber(sword, "combo", currentCombo)
                    sprites.setDataNumber(sword, "time since combo", 0)
                    // Lock swing input during active animation
                    sprites.setDataBoolean(sword, "damage", true)
                    // Capture local reference for timer checks
                    thisHit = currentCombo
                    // 2. Unlock attacks after active swing duration (250ms)
                    // Shortened to 250ms so you can fluidly chain into combo 3 and 4
                    timer.after(250, function () {
                        sprites.setDataBoolean(sword, "damage", false)
                    })
                    if (thisHit == 1) {
                        // 3. Reset combo to 0 if 800ms passes without a follow-up click
                        timer.after(500, function () {
                            // Only reset if the player hasn't triggered hit 3 or 4 yet
                            if (sprites.readDataNumber(sword, "combo") == 1) {
                                sprites.setDataNumber(sword, "combo", 0)
                            }
                        })
                    } else if (thisHit == 2) {
                        // 3. Reset combo to 0 if 800ms passes without a follow-up click
                        timer.after(500, function () {
                            // Only reset if the player hasn't triggered hit 3 or 4 yet
                            if (sprites.readDataNumber(sword, "combo") == 2) {
                                sprites.setDataNumber(sword, "combo", 0)
                            }
                        })
                    } else if (thisHit == 3) {
                        // 3. Reset combo to 0 if 800ms passes without a follow-up click
                        timer.after(500, function () {
                            // Only reset if the player hasn't triggered hit 3 or 4 yet
                            if (sprites.readDataNumber(sword, "combo") == 3) {
                                sprites.setDataNumber(sword, "combo", 0)
                            }
                        })
                    } else if (thisHit == 4) {
                        // 3. Reset combo to 0 if 800ms passes without a follow-up click
                        timer.after(500, function () {
                            // Only reset if the player hasn't triggered hit 3 or 4 yet
                            if (sprites.readDataNumber(sword, "combo") == 4) {
                                sprites.setDataNumber(sword, "combo", 0)
                            }
                        })
                    }
                }
                // Lock swing input during active animation
                sprites.setDataBoolean(sword, "equipped", true)
                sword.setFlag(SpriteFlag.Invisible, false)
            }
        }
    } else {
        sprites.setDataNumber(sword, "combo", 4)
        sprites.setDataNumber(sword, "time since combo", 0)
        sprites.setDataBoolean(sword, "damage", true)
        currentCharge = sprites.readDataNumber(sword, "charge")
        bonus = 3
        if (currentCharge >= 1) {
            bonus += 1
        }
        if (currentCharge >= 2) {
            bonus += 1
        }
        if (currentCharge >= 4) {
            bonus += 1
        }
        old_dmg = sprites.readDataNumber(sword, "power")
        stamina += (sprites.readDataNumber(sword, "charge") - 1) * -90
        sprites.setDataNumber(sword, "power", old_dmg * (bonus / 3))
        timer.after(250, function () {
            sprites.setDataBoolean(sword, "damage", false)
            sprites.setDataNumber(sword, "combo", 0)
            sprites.setDataNumber(sword, "power", old_dmg)
        })
    }
    // Save state to sprite data
    sprites.setDataNumber(sword, "charge", 0)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprite.setVelocity(0, 0)
    if (sprites.readDataBoolean(sprite, "explode")) {
        sprite.x += -15.5
        sprite.y += -15.5
        sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        sprite.setImage(assets.image`explode`)
        sprite.setKind(SpriteKind.Explosion)
        timer.after(50, function () {
            sprites.destroy(sprite)
        })
    } else {
        sprites.destroy(sprite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.setVelocity(0, 0)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1
    if (sprites.readDataBoolean(sprite, "explode")) {
        sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        sprite.x += -15.5
        sprite.y += -15.5
        sprite.setImage(assets.image`explode`)
        sprite.setKind(SpriteKind.Explosion)
        timer.after(50, function () {
            sprites.destroy(sprite)
        })
    } else {
        sprites.destroy(sprite)
    }
})
let progress = 0
let rawTime = 0
let baseRotation = 0
let projectile: Sprite = null
let heart_img: Image = null
let solid2 = 0
let base = 0
let base_stamina: number[] = []
let inner_radii: number[] = []
let outer_radii: number[] = []
let sy = 0
let sx = 0
let old_stamina = 0
let stamina_down = false
let bottom2 = 0
let top2 = 0
let right2 = 0
let left2 = 0
let bottom = 0
let top = 0
let right = 0
let left = 0
let dt = 0
let old_dmg = 0
let bonus = 0
let currentCharge = 0
let thisHit = 0
let currentCombo = 0
let mySprite: Sprite = null
let super_jump = 0
let targetRotation = 0
let statusbar: StatusBarSprite = null
let enim: Sprite = null
let shield: Sprite = null
let sword: Sprite = null
let link: Sprite = null
let stamina = 0
let jump = 0
let linkV: number[] = []
let room = 0
let combo = 0
let currentCombo22 = 0
let current_hp = 0
let container_index = 0
let stamina_drain = 0
let slice: Image = null
let slice2 = null
let myImage = null
let newX = 0
let newY: number = 0
let arc = null
let rings: number[] = []
let ring = 0
let val = 0
let drain = 0
let solid = 0
let mar = 0
let mir = 0
let val2 = 0
let is_active_wheel = false
let currentCombo2 = 0
let thisHit2 = 0
room = 0
linkV = []
let hp = 120
jump = 0
let stamine_nouse = 1
let last_time = game.runtime()
stamina = 1080
tiles.setCurrentTilemap(tilemap`map`)
link = sprites.create(assets.image`link`, SpriteKind.Player)
controller.moveSprite(link, 80, 80)
tiles.placeOnRandomTile(link, assets.tile`spawn`)
tiles.setTileAt(link.tilemapLocation(), assets.tile`floor`)
sword = sprites.create(assets.image`Master sword`, SpriteKind.Weapon)
sprites.setDataNumber(sword, "power", 60)
sprites.setDataNumber(sword, "charge", 0)
sprites.setDataSprite(sword, "damaged", null)
sprites.setDataBoolean(sword, "damage", false)
sprites.setDataBoolean(sword, "charging", false)
sprites.setDataBoolean(sword, "equipped", false)
sword.setFlag(SpriteFlag.Invisible, true)
sprites.setDataNumber(sword, "time since combo", 0)
sprites.setDataNumber(sword, "combo", 0)
shield = sprites.create(assets.image`hylian shield`, SpriteKind.Shield)
sprites.setDataSprite(shield, "wielder", link)
sprites.setDataBoolean(shield, "equipped", false)
shield.setFlag(SpriteFlag.Invisible, true)
let overlay = sprites.create(assets.image`camera`, SpriteKind.Overlay)
let camera_center = sprites.create(assets.image`empty 2x2`, SpriteKind.Overlay)
scene.cameraFollowSprite(camera_center)
let heart_imgs = [
assets.image`empty heart`,
assets.image`quarter heart`,
assets.image`half heart`,
assets.image`3 quarter heart`,
assets.image`heart`
]
overlay.setFlag(SpriteFlag.GhostThroughWalls, true)
camera_center.setFlag(SpriteFlag.GhostThroughWalls, true)
summon_enim(assets.image`Guardian scout 1`, tiles.getTileLocation(27, 8), 180, 1, 1)
game.onUpdate(function () {
    dt = (game.runtime() - last_time) / 1000
    last_time = game.runtime()
    newX = link.x
    newY = link.y
    let dirX = Math.sign(newX - overlay.x)
let dirY = Math.sign(newY - overlay.y)
heart_imgs = [
    assets.image`empty heart`,
    assets.image`quarter heart`,
    assets.image`half heart`,
    assets.image`3 quarter heart`,
    assets.image`heart`
    ]
    // 1. Resolve X Axis
    if (dirX != 0) {
        left = newX - 80
        right = newX + 80
        top = overlay.y - 60
        bottom = overlay.y + 60
        for (let location of tiles.getTilesByType(assets.tile`camerawall`)) {
            if (right > location.x - 8 && left < location.x + 8 && bottom > location.y - 8 && top < location.y + 8) {
                if (dirX > 0 && newX < location.x) {
                    newX = location.column * 16 - 80
                }
                if (dirX < 0 && newX > location.x) {
                    newX = location.column * 16 + 96
                }
            }
        }
    }
    // 2. Resolve Y Axis (using updated newX)
    if (dirY != 0) {
        left2 = newX - 80
        right2 = newX + 80
        top2 = newY - 60
        bottom2 = newY + 60
        for (let location2 of tiles.getTilesByType(assets.tile`camerawall`)) {
            if (right2 > location2.x - 8 && left2 < location2.x + 8 && bottom2 > location2.y - 8 && top2 < location2.y + 8) {
                if (dirY > 0 && newY < location2.y) {
                    newY = location2.row * 16 - 60
                }
                if (dirY < 0 && newY > location2.y) {
                    newY = location2.row * 16 + 76
                }
            }
        }
    }
    if (!(sprites.readDataBoolean(sword, "damage"))) {
        sprites.setDataSprite(sword, "damaged", null)
        controller.moveSprite(link, 80, 80)
    }
    overlay.setPosition(newX, newY)
    camera_center.setPosition(overlay.x, overlay.y)
    stamina_drain = 0
    if (link.vx != 0 || link.vy != 0) {
        spriteFx.setRotation(link, spriteutils.radiansToDegrees(Math.atan2(link.vy, link.vx)))
        if (!(stamina_down)) {
            if (browserEvents.Shift.isPressed() && !(jump) || 0 < super_jump) {
                controller.moveSprite(link, 128, 128)
                stamina_drain += -72
                stamine_nouse = 0
            } else {
                controller.moveSprite(link, 80, 80)
            }
        }
    }
    if (!(stamina_down) && (browserEvents.MouseLeft.isPressed() && !(sprites.readDataBoolean(sword, "damage")))) {
        controller.moveSprite(link, 56, 56)
        if (sprites.readDataNumber(sword, "charge") == 0) {
            old_stamina = stamina
        }
        sprites.changeDataNumberBy(sword, "charge", dt)
        if (sprites.readDataNumber(sword, "charge") >= 1) {
            stamina_nonrate_consumption(old_stamina, (sprites.readDataNumber(sword, "charge") - 1) * -90)
        }
    }
    if (browserEvents.Shift.isPressed() && !(sprites.readDataBoolean(sword, "damage"))) {
        sprites.setDataBoolean(sword, "equipped", false)
        sword.setFlag(SpriteFlag.Invisible, true)
    }
    super_jump += 0 - dt
    jump += 0 - dt
    super_jump = Math.max(super_jump, 0)
    jump = Math.max(jump, 0)
    link.scale = 0.5 + Math.sin(spriteutils.degreesToRadians(Math.map(jump, 0, 0.75, 30, 150)))
    if (stamina_drain >= 0) {
        stamine_nouse += dt
        if (stamine_nouse >= 1) {
            stamina_drain += 216
        }
    }
    stamina = Math.min(stamina + stamina_drain * dt, 1080)
    if (stamina <= 0) {
        stamina_down = true
        stamina = 0
        controller.moveSprite(link, 56, 56)
    }
    if (stamina >= 1080 && stamina_down == true) {
        stamina_down = false
    }
    overlay.image.fill(0)
    if (stamina != 1080) {
        sx = link.x - overlay.x + 70
        sy = link.y - overlay.y + 50
        outer_radii = [3, 6, 8]
        inner_radii = [2, 6, 8]
        base_stamina = [0, 360, 720]
        for (let r = 0; r <= 2; r++) {
            mar = outer_radii[r]
            mir = inner_radii[r]
            base = base_stamina[r]
            val2 = Math.max(0, Math.min(360, stamina - base))
            if (stamina_down) {
                // Exhausted State: Orange refill (4), Black track (15)
                draw_arc(overlay.image, sx, sy, mar, mir, 89, val2 + 91, 4)
                draw_arc(overlay.image, sx, sy, mar, mir, val2 + 89, 451, 15)
            } else {
                // Only apply your drain logic if stamina is currently inside this wheel's 0-360 range
                is_active_wheel = stamina > base && stamina <= base + 360
                let drain2 = is_active_wheel ? Math.min(val2, -stamina_drain) : 0
solid2 = val2 - drain2
                draw_arc(overlay.image, sx, sy, mar, mir, 89, solid2 + 91, 7)
                draw_arc(overlay.image, sx, sy, mar, mir, solid2 + 89, val2 + 91, 2)
                draw_arc(overlay.image, sx, sy, mar, mir, val2 + 89, 451, 15)
            }
        }
    }
    for (let y = 0; y <= 1; y++) {
        for (let x = 0; x <= 14; x++) {
            container_index = y * 15 + x
            // Ensure hp is a valid number, default to 0 if undefined
            current_hp = hp
            let container_hp = Math.clamp(0, 4, current_hp - (container_index * 4))
// Grab image asset with a safety check
            heart_img = heart_imgs[container_hp]
            if (heart_img) {
                overlay.image.drawTransparentImage(heart_img, x * 6, y * 6)
            }
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value, "room") == room) {
            if (room == 1) {
                if (spriteutils.distanceBetween(link, value) < 32 || 0 < sprites.readDataNumber(value, "run")) {
                    sprites.setDataNumber(value, "charge", 0)
                    spriteutils.setVelocityAtAngle(value, spriteutils.angleFrom(link, value), 100)
                    if (sprites.readDataNumber(value, "run") < 0) {
                        sprites.setDataNumber(value, "run", 1)
                    }
                    sprites.changeDataNumberBy(value, "run", 0 - dt)
                } else {
                    value.setVelocity(0, 0)
                    spriteFx.faceToward(value, link)
                }
                sprites.changeDataNumberBy(value, "charge", dt)
                if (sprites.readDataNumber(value, "charge") >= 2) {
                    projectile = sprites.create(assets.image`mini laser`, SpriteKind.Projectile)
                    spriteutils.placeAngleFrom(
                    projectile,
                    spriteutils.degreesToRadians(spriteFx.rotation(value)),
                    5,
                    value
                    )
                    spriteutils.setVelocityAtAngle(projectile, spriteutils.degreesToRadians(spriteFx.rotation(value)), 256)
                    sprites.changeDataNumberBy(value, "charge", -2)
                    sprites.setDataBoolean(projectile, "explode", false)
                }
            }
        }
    }
    sprites.changeDataNumberBy(sword, "time since combo", dt)
    baseRotation = spriteFx.rotation(link)
    combo = sprites.readDataNumber(sword, "combo")
    rawTime = sprites.readDataNumber(sword, "time since combo")
    progress = Math.min(rawTime, 0.25) * 4
    if (combo == 1 || combo == 3) {
        targetRotation = baseRotation + 45 - 90 * progress
    } else if (combo == 2) {
        targetRotation = baseRotation - 45 + 90 * progress
    } else if (combo == 4) {
        targetRotation = baseRotation - 45 + 450 * progress
    } else if (combo == 5) {
        targetRotation = baseRotation
    } else {
        targetRotation = baseRotation + 45
    }
    place_at(targetRotation, link, combo == 5 ? 12 : (combo == 4 ? 14 : 13), sword)
    if (sprites.readDataBoolean(sword, "damage")) {
        controller.moveSprite(link, 0, 0)
    }
    if (sprites.readDataBoolean(shield, "equipped") && browserEvents.CapsLock.isPressed()) {
        shield.setFlag(SpriteFlag.GhostThroughSprites, false)
    } else {
        shield.setFlag(SpriteFlag.GhostThroughSprites, true)
    }
})
