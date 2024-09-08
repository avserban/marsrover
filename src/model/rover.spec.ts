import Rover, { RoverPosition, RoverOrientation } from "./rover";
import Grid from "./grid";

describe('Rover', () => {
    let grid: Grid;
    let rover: Rover;

    beforeEach(() => {
        grid = new Grid(5, 5);
    });

    describe('moveForward', () => {
        it('should move forward in the north direction', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.N, grid);
            rover.moveForward();
            expect(rover.position).toEqual({ x: 1, y: 2 });
        });

        it('should move forward in the east direction', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.E, grid);
            rover.moveForward();
            expect(rover.position).toEqual({ x: 2, y: 1 });
        });

        it('should deactivate the rover if it moves out of bounds', () => {
            rover = new Rover(new RoverPosition(5, 5), RoverOrientation.N, grid);
            rover.moveForward();
            expect(rover.lost).toBe(true);
        });

        it('should not move if the rover is lost', () => {
            rover = new Rover(new RoverPosition(5, 5), RoverOrientation.N, grid);
            rover.deactivateRover()
            rover.moveForward();
            expect(rover.position).toEqual({ x: 5, y: 5 });
        });
    });

    describe('turnLeft', () => {
        it('should turn left from north to west', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.N, grid);
            rover.turnLeft();
            expect(rover.orientation).toBe(RoverOrientation.W);
        });

        it('should turn left from east to north', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.E, grid);
            rover.turnLeft();
            expect(rover.orientation).toBe(RoverOrientation.N);
        });

        it('should not turn if the rover is lost', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.E, grid);
            rover.deactivateRover()
            rover.turnLeft();
            expect(rover.orientation).toBe(RoverOrientation.E);
        });
    });

    describe('turnRight', () => {
        it('should turn right from north to east', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.N, grid);
            rover.turnRight();
            expect(rover.orientation).toBe(RoverOrientation.E);
        });

        it('should turn right from east to south', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.E, grid);
            rover.turnRight();
            expect(rover.orientation).toBe(RoverOrientation.S);
        });

        it('should not turn if the rover is lost', () => {
            rover = new Rover(new RoverPosition(1, 1), RoverOrientation.E, grid);
            rover.deactivateRover()
            rover.turnRight();
            expect(rover.orientation).toBe(RoverOrientation.E);
        });
    });

    describe('deactivateRover', () => {
        it('should deactivate rover when out of grid bounds', () => {
            rover = new Rover(new RoverPosition(0, 0), RoverOrientation.S, grid);
            rover.moveForward();
            expect(rover.lost).toBe(true);
            expect(rover.position).toEqual({ x: 0, y: 0 });
        });
    });
});
