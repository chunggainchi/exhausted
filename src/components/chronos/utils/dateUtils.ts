import { ViewMode, TimeStats } from '../types';

export const getDaysInYear = (year: number): number => {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365;
};

export const getDayOfYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

export const getWeekOfYear = (date: Date): number => {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const totalDays = Math.floor((date.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((totalDays + firstJan.getDay() + 1) / 7);
};

export const getMonthDiff = (d1: Date, d2: Date): number => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

export const calculateStats = (viewMode: ViewMode, birthDate?: Date, lifeExpectancy: number = 80): TimeStats => {
    const now = new Date();

    // LIFE MODE - CHANGED TO MONTHS
    if (viewMode === ViewMode.Life) {
        const baseDate = birthDate || new Date('2000-01-01');
        const years = lifeExpectancy || 80;
        const totalMonths = years * 12;

        // Calculate months passed
        const passedMonths = getMonthDiff(baseDate, now);

        // Calculate progress within current month
        // Finds the first day of the current month in the sequence
        // This is an approximation for visualization progress
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const totalDaysInMonth = (nextMonthStart.getTime() - currentMonthStart.getTime()) / (1000 * 60 * 60 * 24);
        const dayInMonth = now.getDate();

        const progressInMonth = (dayInMonth / totalDaysInMonth) * 100;
        const percentage = ((passedMonths + (progressInMonth / 100)) / totalMonths) * 100;

        return {
            totalUnits: totalMonths,
            passedUnits: passedMonths,
            currentUnitIndex: passedMonths,
            percentage: percentage,
            daysLeft: Math.max(0, totalMonths - passedMonths),
            currentUnitProgress: progressInMonth,
            label: 'Months Left'
        };
    }

    // YEAR CONTEXT (Day/Week Views)
    const year = now.getFullYear();
    const totalDays = getDaysInYear(year);
    const dayOfYear = getDayOfYear(now);

    if (viewMode === ViewMode.Day) {
        const secondsInDay = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const unitProgress = (secondsInDay / 86400) * 100;

        return {
            totalUnits: totalDays,
            passedUnits: dayOfYear - 1,
            currentUnitIndex: dayOfYear - 1,
            percentage: ((dayOfYear - 1 + (unitProgress / 100)) / totalDays) * 100,
            daysLeft: totalDays - dayOfYear,
            currentUnitProgress: unitProgress,
            label: 'Days Left'
        };
    } else {
        // Week Mode (Yearly context)
        const totalWeeks = 52;
        const currentWeek = getWeekOfYear(now);

        // Approximate week progress
        const dayOfWeek = now.getDay();
        const secondsInWeek = (dayOfWeek * 86400) + (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
        const unitProgress = (secondsInWeek / (7 * 86400)) * 100;

        return {
            totalUnits: totalWeeks,
            passedUnits: currentWeek - 1,
            currentUnitIndex: currentWeek - 1,
            percentage: ((currentWeek - 1) / totalWeeks) * 100,
            daysLeft: totalWeeks - (currentWeek - 1),
            currentUnitProgress: unitProgress,
            label: 'Weeks Left'
        };
    }
};

export const getFormattedDate = (): string => {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};