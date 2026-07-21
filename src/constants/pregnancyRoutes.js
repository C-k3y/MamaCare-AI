/**
 * Pregnancy Tracking specific constants
 */
export const TRIMESTERS = {
    FIRST: {
        id: 1,
        name: 'First Trimester',
        startWeek: 1,
        endWeek: 13,
        description: 'Crucial time for fetal development.'
    },
    SECOND: {
        id: 2,
        name: 'Second Trimester',
        startWeek: 14,
        endWeek: 27,
        description: 'Often the most comfortable trimester.'
    },
    THIRD: {
        id: 3,
        name: 'Third Trimester',
        startWeek: 28,
        endWeek: 40,
        description: 'Final stretch before birth.'
    }
};

export const BABY_SIZES_BY_WEEK = {
    4: 'Poppy Seed',
    8: 'Raspberry',
    12: 'Plum',
    16: 'Avocado',
    20: 'Banana',
    24: 'Cantaloupe',
    28: 'Eggplant',
    32: 'Squash',
    36: 'Papaya',
    40: 'Watermelon'
};

export default { TRIMESTERS, BABY_SIZES_BY_WEEK };
