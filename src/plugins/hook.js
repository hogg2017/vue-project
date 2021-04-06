export default class Todolisthook {
  constructor(compeleteData, singleData) {
    this.hookData.compeleteData = compeleteData
    this.hookData.singleData = singleData
  }
  hookInit() {}
  hookTrigger(vm, eventName) {
    vm.$emit(eventName, this.hookData)
  }
}
