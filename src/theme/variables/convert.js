export function convertNumber(number) {
    if (number) {
        number = number.toString();
        let lastThree = number.substring(number.length - 3);
        let otherNumbers = number.substring(0, number.length - 3);
        if (otherNumbers != '')
            lastThree = '.' + lastThree;
        let output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + lastThree;

        return output;
    }
}

export function convertNumberString(number) {
    if (number) {
        number = number.toString();
        let lastThree = number.substring(number.length - 3);
        let otherNumbers = number.substring(0, number.length - 3);
        if (otherNumbers != '')
            lastThree = '.' + lastThree;
        let output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + lastThree;

        return output.toString();
    }
}

export function convertToLetterCase(string) {
    if (string) {
        return string.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }
}

export function convertUnderscoreToSpace(string) {
    if (string) {
        let word = string.split("_");
        let join = word.join(" ")
        return join;
    }
}

export function splitByCaps(string) {
    if (string) {
        return string.split(/(?=[A-Z])/).join(" ");
    }
}

export function regexEmail(email) {
    if (email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email);
    }
}

export function regexNumber(number) {
    if (number) {
        let reg = /^\d+$/;
        return reg.test(number)
    }
}

export function tConvert(time) {
    // Check correct time format and split into components
    if (time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
}

export function getFirstName(name) {
    if (name) {
        let first = name.split(" ");
        if (first.length > 0) {
            return first[0];
        } else {
            return first;
        }
    }
}

export function remainingDate(string) {
    if (string) {
        if (string == 'Overdue') {
            return 'OVER DUE DATE';
        } else if (parseInt(string) == 1) {
            return string + ' DAY REMAINING';
        } else if (parseInt(string) == 0) {
            return 'TODAY';
        } else {
            return string + ' DAYS REMAININGS';
        }
    }
}

export function convertToLowerCase(string) {
    if (string) {
        return string.toLowerCase();
    }
}
