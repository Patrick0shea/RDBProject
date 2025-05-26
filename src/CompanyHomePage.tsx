// CompanyHomePage.tsx
import React from "react";
import RankingBlock from "./RankingBlock";

const CompanyHomePage: React.FC = () => {
  return (
    <>
      <RankingBlock
        title="Student: Sam Mcloughlin"
        info1="CV link: https://example.com/cv-sam"
        info2="Link to LinkedIn: https://linkedin.com/in/sam-mcloughlin"
        info3="QCA: 4.5/5"
      />
      <RankingBlock
        title="Student: Patrick O'Shea"
        info1="CV link: https://example.com/cv-patrick"
        info2="Link to LinkedIn: https://linkedin.com/in/patrick-oshea"
        info3="QCA: 4.2/5"
      />
      <RankingBlock
        title="Student: Hugh Feehan"
        info1="CV link: https://example.com/cv-hugh"
        info2="Link to LinkedIn: https://linkedin.com/in/hugh-feehan"
        info3="QCA: 4.3/5"
      />
      <RankingBlock
        title="Student: Aaron McGuinness"
        info1="CV link: https://example.com/cv-aaron"
        info2="Link to LinkedIn: https://linkedin.com/in/aaron-mcguinness"
        info3="QCA: 4.4/5"
      />
    </>
  );
};

export default CompanyHomePage;
