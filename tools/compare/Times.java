import com.batoulapps.adhan.CalculationMethod;
import com.batoulapps.adhan.CalculationParameters;
import com.batoulapps.adhan.Coordinates;
import com.batoulapps.adhan.Madhab;
import com.batoulapps.adhan.PrayerTimes;
import com.batoulapps.adhan.Qibla;
import com.batoulapps.adhan.data.DateComponents;

/** Prints adhan-java 1.2.1 times (epoch ms) for the cities, methods and dates in compare-js.js, one line each. */
public class Times {
    public static void main(String[] a) {
        double[][] cities = {
            {30.0444, 31.2357}, {31.2001, 29.9187}, {24.0889, 32.8998}, {21.3891, 39.8579}, {24.7136, 46.6753},
            {25.2048, 55.2708}, {29.3759, 47.9774}, {25.2854, 51.5310}, {31.9539, 35.9106}, {31.5075, 34.4597},
            {33.8869, 35.5131}, {36.2000, 37.1600}, {36.3417, 43.1292}, {26.2167, 50.5833}, {23.6139, 58.5922},
            {12.8000, 45.0333}, {17.0197, 54.0897}};
        CalculationMethod[] methods = {
            CalculationMethod.EGYPTIAN, CalculationMethod.UMM_AL_QURA, CalculationMethod.MUSLIM_WORLD_LEAGUE,
            CalculationMethod.KARACHI, CalculationMethod.DUBAI, CalculationMethod.KUWAIT, CalculationMethod.QATAR,
            CalculationMethod.NORTH_AMERICA, CalculationMethod.MOON_SIGHTING_COMMITTEE, CalculationMethod.SINGAPORE};
        int[][] dates = {{2026, 10, 21}, {2026, 12, 21}, {2027, 3, 20}, {2027, 6, 21}, {2027, 2, 15}, {2026, 8, 1}};
        StringBuilder out = new StringBuilder();
        for (int c = 0; c < cities.length; c++) {
            Coordinates where = new Coordinates(cities[c][0], cities[c][1]);
            for (int m = 0; m < methods.length; m++) {
                for (int h = 0; h < 2; h++) {
                    for (int[] d : dates) {
                        CalculationParameters p = methods[m].getParameters();
                        p.madhab = h == 1 ? Madhab.HANAFI : Madhab.SHAFI;
                        PrayerTimes t = new PrayerTimes(where, new DateComponents(d[0], d[1], d[2]), p);
                        out.append(c).append(' ').append(m).append(' ').append(h).append(' ')
                            .append(d[0]).append('-').append(d[1]).append('-').append(d[2]).append(' ')
                            .append(t.fajr.getTime()).append(' ').append(t.sunrise.getTime()).append(' ')
                            .append(t.dhuhr.getTime()).append(' ').append(t.asr.getTime()).append(' ')
                            .append(t.maghrib.getTime()).append(' ').append(t.isha.getTime()).append('\n');
                    }
                }
            }
            out.append("Q ").append(c).append(' ').append(new Qibla(where).direction).append('\n');
        }
        System.out.print(out);
    }
}
