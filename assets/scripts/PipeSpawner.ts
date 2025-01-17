// 管道生成

import { _decorator, Component, Node, Prefab, instantiate, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {
  @property(Prefab)
  pipePrefab: Prefab = null; // 管道预制体

  // 生成速率
  @property
  spawnRate: number = 2; // 2秒生成一个

  // 计时器
  private timer: number = 0;

  // 是否正在生成
  private _isSpawning: boolean = false;

  start() {}

  update(deltaTime: number) {
    if (!this._isSpawning) return;

    // 计时
    this.timer += deltaTime;

    // 生成
    if (this.timer >= this.spawnRate) {
      this.timer = 0;

      // 生成管道
      const pipeInst = instantiate(this.pipePrefab);
      this.node.addChild(pipeInst);

      const p = this.node.getWorldPosition(); // 世界坐标
      pipeInst.setWorldPosition(p);

      const y = math.randomRangeInt(-100, 200); // 随机高度

      // 本地坐标
      const pLocal = pipeInst.getPosition();

      // 设置管道位置
      pipeInst.setPosition(pLocal.x, y);
    }
  }

  // 设置是否生成
  public setSpawning(isSpawning: boolean) {
    this._isSpawning = isSpawning;
  }
}
