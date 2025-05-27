public class gradeCalculator {
    public static void main(String[] args) {
        double QCA        = 2.4;
        double attendance = 85.0;  // from ian and mark
        double PP1        = 65.0; // from ian and mark also
        double PP2        = 25.0;
        double PP3        = 40.0;
        double PP4        = 23.0;


        double weightedQCA = (QCA / 4.0)      * 70.0;  // 70% weight
        double weightedAtt = (attendance / 100.0) * 20.0;  // 20% weight

        double projectAvg = (PP1 + PP2 + PP3 + PP4 ) / 4.0;
        double weightedProj = (projectAvg / 100.0) * 10.0;  // 10% weight

        double finalGrade = weightedQCA + weightedAtt + weightedProj;


        System.out.println("Residency Ranking Score = " + finalGrade);
    }
}