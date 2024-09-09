import readline from "readline/promises";

import logger from "./logger";
import { Grid, Rover } from "./model";
import { RoverOrientation, RoverPosition } from "./model/rover";

const startProgram = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    try {
        let input = (await rl.question("Please specify the size of your grid as two numbers separated by a space or type in 'exit' if you want to end program: "))
        if ("exit" === input.toLowerCase()) {
            logger.info("User requested termination of program. Exiting...");
            return;
        }
        
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const [sizeX, sizeY] = input.trim().split(' ').map(Number);
            input = (await rl.question("Please specify the starting position for the robot. This takes the form of two numbers and a cardinal direction separated by space (For example: 0 0 E) or type in 'exit' if you want to end program: "));
            if ("exit" === input.toLowerCase()) {
                logger.info("User requested termination of program. Exiting...");
                return;
            }
            
            const [x, y, orientation] = input.trim().split(' ');
            if (!Object.keys(RoverOrientation).includes(orientation)) {
                throw new Error(`Provided orientation is not valid. Please supply a value from: ${Object.values(RoverOrientation)}`);
            }

            const grid = new Grid(sizeX, sizeY);
            const roverPosition = RoverOrientation[orientation as keyof typeof RoverOrientation];
            const rover = new Rover(new RoverPosition(Number(x), Number(y)), roverPosition, grid);

            input = (await rl.question("Please specify the commands you would like the rover to execute. For example: LFRFF or FFLFRFF. Or type in 'exit' if you want to end program: "))
            if ("exit" === input.toLowerCase()) {
                logger.info("User requested termination of program. Exiting...");
                return;
            }
            
            const cmds = input.trim().replace(/\s/g, "").split("");
            logger.info(`Executing input suplied by user: ${cmds}`);

            for (const cmd of cmds) {
                logger.info(`Executing command: ${cmd}`);

                switch (cmd) {
                    case "L": rover.turnLeft(); break;
                    case "R": rover.turnRight(); break;
                    case "F": rover.moveForward(); break;
                    default: logger.error(`Unrecognised command ${cmd}. Valid commands are: L, R or F. Skipping and resuming execution with next command...`)
                }
            }

            logger.info("Successfully executed all issued commands to rover.");
            logger.info(`Rover's last position is: (${rover.position.x}, ${rover.position.y}, ${rover.orientation})${rover.lost ? " LOST" : ""}`);
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
        logger.error(err.message);
    } finally {
        logger.info("Cleaning up program resources...");
        rl.close();
        logger.info("Gracefully closed program...");
    }
}
    
logger.info("Welcome to Mars Rover Program. Starting up...");
startProgram();
