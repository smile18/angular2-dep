export interface DeepRule {
  activity: string,
  system: string,
  condition: string,
  compensatingFlow: string,
  numberOfRetries: number,
  retryDelay: number,
  messageQos: number,
  isNotDeleteFlag: boolean,
  createdBy: string,
  modifiedBy: string,
  insertCheck: boolean
}
