/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * Checks if n is within a range (inclusive)
     * @param min The minimum boundary for n
     * @param n The number you want to check is in bounds
     * @param max The maximum boundary for n
     */
    //% block ="is $n between $min and $max ?"
    export function within(min: number,n: number,max:number): boolean {
        return min<=n&&n<=max;
    }
}
