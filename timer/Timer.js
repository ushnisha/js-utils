/*
 *  Timer is javascript code that provides a simple start/pause/resume/stop
 *  timer functionality.
 *  Copyright (C) 2020 Arun Kunchithapatham
 *
 *  This file is part of js-utils
 *
 *  Timer is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Timer is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with Timer.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
 * A Timer object must be started using the "start" function
 * A Timer that has started, but not stopped, can be paused/resumed
 * A Timer that has started, can be stopped, but not started/paused until reset
 * A Timer that is stopped can be reset, after which it can be started again
 * getString() returns the duration in hh:mm:ss for which the Timer was active
*/


class Timer {

    constructor() {
        this.elapsed = 0;
        this.start = 0;
        this.end = 0;
        this.started = false;
        this.paused = false;
        this.stopped = false;
    }

    begin() {
        if (this.stopped) return;
        if (this.started) return;

        this.start = performance.now();
        this.started = true;
        this.paused = false;
    }

    pause_resume() {
        if (!this.started) return;
        if (this.stopped) return;

        if (!this.paused) {
            this.end = performance.now();
            this.elapsed = this.elapsed + (this.end - this.start);
            this.start = 0;
            this.end = 0;
            this.paused = true;
        }
        else {
            this.start = performance.now();
            this.paused = false;
        }

    }

    stop() {
        if (!this.started) return;
        if (this.stopped) return;

        if (!this.paused) {
            this.end = performance.now();
            this.elapsed = this.elapsed + (this.end - this.start);
            this.start = 0;
            this.end = 0;
            this.paused = true;
        }
        else {
            this.start = 0;
            this.end = 0;
        }
        this.stopped = true;
    }

    reset() {
        this.elapsed = 0;
        this.start = 0;
        this.end = 0;
        this.started = false;
        this.paused = false;
        this.stopped = false;
    }

    getString() {
        const seconds_in_hour = 3600;
        const seconds_in_minute = 60;

        let delta = this.elapsed;
        if (!this.paused && !this.stopped) {
            delta = delta + (performance.now() - this.start);
        }
        delta = Math.floor(delta/1000);

        let hours = Math.floor(delta/seconds_in_hour);
        delta = delta - hours * seconds_in_hour;
        let minutes = Math.floor(delta/seconds_in_minute);
        delta = delta - minutes * seconds_in_minute;
        let seconds = delta;

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        return hours + ":" + minutes + ":" + seconds;
    }

}

