type Weapon = '断魄' | '通碧' | '坠明' | '荧焰' | '折镜'
type Queue = [Weapon, Weapon, Weapon, Weapon, Weapon]
type Process = Weapon[]
type Adjoins = [Weapon, Weapon, Weapon]
type Gaps = [Weapon, Weapon]

enum WeaponEnum {
  red = '断魄', // 1
  green = '通碧', // 2
  violet = '坠明', // 3
  blue = '荧焰', // 4
  white = '折镜' // 5
}

interface Config {
  maxStayCount: number,
}

interface TreeNode {
  queue: Queue,
  process: Process,
  stayCount: number
}

export class Aphelios {
  public initQueue: Queue = [
    WeaponEnum.green,
    WeaponEnum.red,
    WeaponEnum.violet,
    WeaponEnum.blue,
    WeaponEnum.white,
  ]
  public targetQueue: Queue = [
    WeaponEnum.red,
    WeaponEnum.white,
    WeaponEnum.green,
    WeaponEnum.violet,
    WeaponEnum.blue,
  ]
  public config: Config = {
    maxStayCount: 2,
  }

  constructor(config?: Config) {
    if (config) {
      this.config = {
        ...this.config,
        ...config
      }
    }
  }

  public setInitQueue(queue: Queue) {
    if (queue.length !== 5) {
      console.warn('error length')
    }
    this.initQueue = queue
  }

  public setTargetQueue(queue: Queue) {
    if (queue.length !== 5) {
      console.warn('error length')
    }
    this.targetQueue = queue
  }

  public getProcess() {
    const { initQueue, targetQueue } = this
    const { maxStayCount } = this.config
    if (!targetQueue.length) {
      console.error('无目标')
    }
    if (this.isCycleQueue(this.initQueue, this.targetQueue)) {
      return []
    }
    const allProcess: Process[] = []
    const happenedQueue: Queue[] = []
    const turn = (queue: Queue) => (queue.push(queue.shift()!), queue[queue.length - 1])

    const swapTurn = (queue: Queue) => (queue.push(...queue.splice(1, 1)), queue[queue.length - 1])

    const operation = (queue: Queue) => {
      // turn
      const _tQueue = [...queue] as Queue
      const _tWeapon = turn(_tQueue)
      // swapTurn
      const _sQueue = [...queue] as Queue
      const _sWeapon = swapTurn(_sQueue)

      return { _tQueue, _tWeapon, _sQueue, _sWeapon }
    }

    const BFT = (queue: Queue) => {
      let stack: TreeNode[] = []
      stack.unshift({
        queue,
        process: [],
        stayCount: -1 // important
      })

      while(stack.length) {
        let { queue, process, stayCount } = stack.shift()!
        if (
          !happenedQueue.some(t => this.isEqualQueue(t, queue)) // 边界：是否操作过
        ) {
          happenedQueue.push(queue)
          const { _tQueue, _tWeapon, _sQueue, _sWeapon } = operation(queue)
          const generateNodes: TreeNode[] = []

          if (this.isCycleQueue(_tQueue, targetQueue)) {
            allProcess.push([...process, _tWeapon])
          } else {
            generateNodes.push({
              queue: _tQueue,
              process: [...process, _tWeapon],
              stayCount: 0
            })
          }

          if (
            stayCount < maxStayCount - 1 // 边界： 最大滞留次数
          ) {
            if (this.isCycleQueue(_sQueue, targetQueue)) {
              allProcess.push([...process, _sWeapon]);
            } else {
              generateNodes.push({
                queue: _sQueue,
                process: [...process, _sWeapon],
                stayCount: stayCount + 1
              })
            }
          }

          stack = stack.concat(generateNodes);
        }
      }
    }

    BFT(initQueue)

    console.log("🚀 ~ file: efls_weapons.ts ~ line 93 ~ Aphelios ~ getProcess ~ allProcess", allProcess)
    if (allProcess.length) {
      const result: Process[] = allProcess.filter((t) => t.length === allProcess[0].length)
      console.log("🚀 ~ file: efls_weapons.ts ~ line 103 ~ Queue ~ result ~ result", result)
      return result
    } else {
      return []
    }
  }

  // public getPartProcess(value: Adjoins) {
  // }

  public isEqualQueue(queueA: Queue, queueB: Queue): boolean  {
    if (queueA.length !== queueB.length) return false
    return queueA.every((t, i) => t === queueB[i])
  }

  // O(2n)
  public isCycleQueue(queueA: Queue, queueB: Queue): boolean {
    if (queueA.length !== queueB.length) return false
    const res = queueA.reduce((queueBIndex: number, cur, curIndex) => {
      if (curIndex === 0) {
        return queueB.findIndex(bItem => bItem === cur)
      } else {
        if (queueBIndex === -1) return -1
        const queueACur = cur
        const _queueBIndex = queueBIndex + 1 >= queueB.length ? queueBIndex + 1 - queueB.length : queueBIndex + 1
        const queueBCur = queueB[_queueBIndex]
        return queueACur === queueBCur ? _queueBIndex : -1
      }
    }, -1) > -1
    return res
  }
}
