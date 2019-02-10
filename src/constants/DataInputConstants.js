export default {
    object_type: {
        CARGO: 0,
        HATCH: 1
    },
    locations: {
        CARGO_SHIP: 0,
        RIGHT_ROCKET: 1,
        LEFT_ROCKET: 2,
        RIGHT_FEEDER: 3,
        LEFT_FEEDER: 4,
        RIGHT_DEPOT: 5,
        LEFT_DEPOT: 6
    },
    actions: {
        SHIP_SCORE_HATCH: 0,
        SHIP_MISSED_HATCH: 1,
        SHIP_SCORE_CARGO: 2,
        SHIP_MISSED_CARGO: 3,
        ROCKET_SCORE_HATCH_HIGH: 4,
        ROCKET_SCORE_HATCH_MID: 5,
        ROCKET_SCORE_HATCH_LOW: 6,
        ROCKET_MISSED_HATCH_HIGH: 7,
        ROCKET_MISSED_HATCH_MID: 8,
        ROCKET_MISSED_HATCH_LOW: 9,
        ROCKET_SCORE_CARGO_HIGH: 10,
        ROCKET_SCORE_CARGO_MID: 11,
        ROCKET_SCORE_CARGO_LOW: 12,
        ROCKET_MISSED_CARGO_HIGH: 13,
        ROCKET_MISSED_CARGO_MID: 14,
        ROCKET_MISSED_CARGO_LOW: 15,
        FLOOR_PICKUP: 16,
        FEEDER_PICKUP: 17,
        DEPOT_PICKUP: 18,
        DEFENDED: 19,
        GOT_DEFENDED: 20,
        DIED: 21,
        DROPPED: 22
    }
}