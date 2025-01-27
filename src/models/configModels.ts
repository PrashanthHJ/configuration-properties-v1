export interface ConfigProperties {
    dbName: string;
    dbPort: string;
    dbHost: string;
  }

export interface Configuration {
    sequenceNo: string;
    integrationName: string;
    profile: string;
    isActive: boolean;
    version: number;
    AWSFlag: boolean;
    properties: ConfigProperties;
  }
