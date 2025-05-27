const studentCompanies = [
  ["Bence", "Unity", "Cloudflare", "Meta", "GitHub", "Zoom", "Netflix", "IBM", "Amazon", "Dropbox", "Bitbucket", "Microsoft", "Heroku", "Shopify", "Atlassian", "Salesforce", "Stripe", "MongoDB", "Riot Games", "Nvidia", "Slack", "Reddit", "Cisco", "Spotify", "Google", "Oracle", "Apple", "Intel", "Adobe", "LinkedIn"],
  ["Hugh", "GitHub", "Atlassian", "Amazon", "Apple", "Unity", "Microsoft", "Zoom", "Netflix", "Adobe", "Shopify", "MongoDB", "Heroku", "Intel", "Stripe", "Cloudflare", "Salesforce", "Spotify", "Cisco", "Bitbucket", "Oracle", "Meta", "Slack", "Dropbox", "IBM", "Google", "LinkedIn", "Reddit", "Nvidia", "Riot Games"],
  ["Javier", "Meta", "Dropbox", "Unity", "Atlassian", "IBM", "Nvidia", "Shopify", "Salesforce", "Spotify", "Google", "Riot Games", "Heroku", "Microsoft", "Cisco", "Zoom", "Stripe", "MongoDB", "Reddit", "Amazon", "LinkedIn", "Netflix", "Bitbucket", "Adobe", "Apple", "GitHub", "Slack", "Oracle", "Intel", "Cloudflare"],
  ["Connor"],
  ["Kieran", "GitHub", "Salesforce", "Zoom", "Spotify", "Oracle", "Intel", "Nvidia", "Netflix", "Heroku", "Slack", "Meta", "Amazon", "Reddit", "IBM", "Unity", "Bitbucket", "Shopify", "Stripe", "Google", "Dropbox", "Atlassian", "Riot Games", "Cloudflare", "Apple", "MongoDB", "LinkedIn", "Microsoft", "Cisco", "Adobe"],
  ["Liam", "Shopify", "Apple", "Bitbucket", "Nvidia", "Meta", "IBM", "Amazon", "Salesforce", "Cisco", "Dropbox", "Microsoft", "Heroku", "Atlassian", "Stripe", "Unity", "Adobe", "Oracle", "Zoom", "Reddit", "Google", "Spotify", "Netflix", "MongoDB", "Slack", "Cloudflare", "GitHub", "Riot Games", "Intel", "LinkedIn"],
  ["Mason", "Salesforce", "Netflix", "Spotify", "Riot Games", "Reddit", "Cloudflare", "Microsoft", "Unity", "Bitbucket", "Cisco", "Nvidia", "Meta", "Heroku", "MongoDB", "Zoom", "Amazon", "Stripe", "Apple", "Adobe", "Shopify", "Atlassian", "Dropbox", "Oracle", "IBM", "GitHub", "Google", "Intel", "LinkedIn", "Slack"],
  ["Noah", "Unity", "Adobe", "Reddit", "Salesforce", "GitHub", "IBM", "Cloudflare", "Apple", "Shopify", "Bitbucket", "Oracle", "Netflix", "Microsoft", "Nvidia", "Cisco", "Meta", "Zoom", "MongoDB", "Heroku", "Amazon", "Dropbox", "Atlassian", "Google", "Slack", "Intel", "Spotify", "Riot Games", "Stripe", "LinkedIn"],
  ["Oliver", "Microsoft", "Apple", "Zoom", "Riot Games", "Shopify", "Netflix", "Meta", "Google", "Cisco", "Reddit", "Oracle", "Stripe", "Atlassian", "Heroku", "LinkedIn", "Slack", "Adobe", "GitHub", "Unity", "Cloudflare", "Dropbox", "Intel", "Amazon", "Spotify", "IBM", "MongoDB", "Salesforce", "Bitbucket", "Nvidia"],
  ["Riley", "Slack", "Reddit", "IBM", "Salesforce", "Meta", "Amazon", "Bitbucket", "Netflix", "Shopify", "Stripe", "Zoom", "Heroku", "Google", "Cisco", "Nvidia", "Dropbox", "Spotify", "Microsoft", "Apple", "GitHub", "LinkedIn", "Intel", "Cloudflare", "MongoDB", "Adobe", "Unity", "Atlassian", "Oracle", "Riot Games"],
  ["Santiago", "Nvidia", "Reddit", "Slack", "Shopify", "MongoDB", "Zoom", "Adobe", "Bitbucket", "Stripe", "Netflix", "Apple", "Riot Games", "Oracle", "Salesforce", "Cisco", "Dropbox", "Google", "Atlassian", "Unity", "Microsoft", "Heroku", "Meta", "Spotify", "Amazon", "Cloudflare", "LinkedIn", "IBM", "GitHub", "Intel"],
  ["Ryan", "Netflix", "Cisco", "Meta", "Salesforce", "Microsoft", "Shopify", "Atlassian", "Spotify", "Heroku", "GitHub", "Slack", "Amazon", "Adobe", "MongoDB", "Reddit", "Apple", "Riot Games", "Cloudflare", "Dropbox", "Bitbucket", "Zoom", "Google", "Unity", "Nvidia", "LinkedIn", "Intel", "IBM", "Stripe", "Oracle"],
  ["Sam", "Unity", "Amazon", "Adobe", "Google", "Spotify", "Zoom", "IBM", "Slack", "Atlassian", "Bitbucket", "Microsoft", "Meta", "Intel", "Cloudflare", "Salesforce", "LinkedIn", "Reddit", "Heroku", "Oracle", "Stripe", "GitHub", "Shopify", "Apple", "Cisco", "Nvidia", "Dropbox", "Netflix", "Riot Games", "MongoDB"],
  ["Patty", "Adobe", "Reddit", "Salesforce", "Heroku", "Amazon", "Meta", "Microsoft", "Zoom", "Netflix", "Spotify", "GitHub", "LinkedIn", "Unity", "Slack", "Dropbox", "MongoDB", "Google", "Bitbucket", "Shopify", "Nvidia", "Intel", "Stripe", "Cisco", "Riot Games", "Apple", "Atlassian", "IBM", "Oracle", "Cloudflare"],
  ["Aaron", "Atlassian", "Meta", "Spotify", "Shopify", "GitHub", "Bitbucket", "Amazon", "Salesforce", "LinkedIn", "Riot Games", "Dropbox", "IBM", "Slack", "Intel", "Reddit", "Stripe", "Heroku", "Cloudflare", "Apple", "Oracle", "Nvidia", "Cisco", "Unity", "Netflix", "Zoom", "Adobe", "MongoDB", "Google", "Microsoft"],
  ["Emer", "Reddit", "IBM", "Apple", "Nvidia", "Shopify", "Zoom", "GitHub", "Unity", "Adobe", "Cisco", "Cloudflare", "Meta", "Dropbox", "LinkedIn", "Stripe", "Netflix", "Amazon", "Salesforce", "Microsoft", "Oracle", "MongoDB", "Riot Games", "Slack", "Atlassian", "Heroku", "Intel", "Bitbucket", "Spotify", "Google"],
  ["Bob", "Apple", "Cisco", "Salesforce", "Oracle", "MongoDB", "Reddit", "Adobe", "Amazon", "Microsoft", "Intel", "Heroku", "Spotify", "Cloudflare", "Stripe", "Bitbucket", "Zoom", "GitHub", "LinkedIn", "Meta", "Nvidia", "Atlassian", "Unity", "Netflix", "IBM", "Google", "Slack", "Dropbox", "Riot Games", "Shopify"],
  ["Shrek", "Cisco", "Meta", "IBM", "Salesforce", "Shopify", "Unity", "Dropbox", "Cloudflare", "Heroku", "Zoom", "Amazon", "Netflix", "Stripe", "Google", "Spotify", "Microsoft", "GitHub", "Reddit", "Atlassian", "Apple", "Bitbucket", "MongoDB", "Adobe", "Riot Games", "Intel", "LinkedIn", "Nvidia", "Slack", "Oracle"],
  ["Donkey", "Apple", "Riot Games", "Meta", "Shopify", "Google", "Adobe", "Slack", "IBM", "Unity", "GitHub", "Bitbucket", "Zoom", "Reddit", "LinkedIn", "Dropbox", "Microsoft", "Amazon", "Cloudflare", "Oracle", "Salesforce", "Spotify", "Cisco", "MongoDB", "Atlassian", "Stripe", "Intel", "Heroku", "Netflix", "Nvidia"],
  ["Fred", "Adobe", "Amazon", "GitHub", "Salesforce", "Riot Games", "MongoDB", "Microsoft", "Shopify", "Heroku", "Meta", "Zoom", "Spotify", "Bitbucket", "Reddit", "Stripe", "Unity", "Cloudflare", "Cisco", "Intel", "Slack", "Dropbox", "Apple", "Oracle", "Nvidia", "LinkedIn", "Google", "Netflix", "Atlassian", "IBM"],
  ["SantiagosMa", "Spotify", "Heroku", "Adobe", "Unity", "Bitbucket", "Riot Games", "Cisco", "Slack", "Netflix", "Amazon", "Apple", "GitHub", "Meta", "IBM", "Dropbox", "Shopify", "Salesforce", "Google", "MongoDB", "Intel", "Microsoft", "Zoom", "LinkedIn", "Reddit", "Stripe", "Atlassian", "Cloudflare", "Oracle", "Nvidia"]
];


const jobs = [
  ["Amazon", 3],
  ["Microsoft", 3],
  ["Google", 3],
  ["Meta", 3],
  ["Netflix", 3],
  ["Apple", 3],
  ["Tesla", 3],
  ["Stripe", 3],
  ["Shopify", 3],
  ["Slack", 3],
  ["Spotify", 3],
  ["GitHub", 3],
  ["Reddit", 3],
  ["Adobe", 3],
  ["IBM", 3],
  ["Oracle", 3],
  ["Cloudflare", 3],
  ["Unity", 3],
  ["Nvidia", 3],
  ["Riot Games", 3],
  ["Salesforce", 3],
  ["MongoDB", 3],
  ["LinkedIn", 3],
  ["Cisco", 3],
  ["Heroku", 3],
  ["Atlassian", 3],
  ["Zoom", 3],
  ["Intel", 3],
  ["Dropbox", 3],
  ["Bitbucket", 3]
];

const rankingAlgorithm = (studentCompanies, jobs) => {
    const studentsJobs = [];
    const maxJobsPerStudent = 3;
    const unrankedStudents = [];

    for (let i = 0; i < studentCompanies.length; i++) {
        const student = studentCompanies[i][0];

        // Check if the student has no companies listed
        if (studentCompanies[i].length === 1) {
            unrankedStudents.push(student);
            continue;
        }

        let jobCount = 0;

        for (let j = 1; j < studentCompanies[i].length; j++) {
            const company = studentCompanies[i][j];
            const job = jobs.find(job => job[0] === company);

            if (job) {
                const spaces = job[1];
                if (spaces > 0 && jobCount < maxJobsPerStudent) {
                    studentsJobs.push([student, company]);
                    job[1]--;
                    jobCount++;
                }
            } else {
                console.log(`Company ${company} not found in the job list.`);
            }
        }

    }

    return { studentsJobs, unrankedStudents };
};

const { studentsJobs, unrankedStudents } = rankingAlgorithm(studentCompanies, jobs);

// Print job assignments
console.log("Job Assignments:");
for (let row of studentsJobs) {
  console.log(row.join(", "));
}

// Print unranked students
console.log("\nStudents who did not provide any company preferences:");
for (let student of unrankedStudents) {
  console.log(student);
}