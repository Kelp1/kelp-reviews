FROM mongo

COPY trialDataForDeploymentSmall.json /trialDataForDeploymentSmall.json
CMD mongoimport --host mongodb --db kelp-reviews --collection restaurants --type json --file /trialDataForDeploymentSmall.json