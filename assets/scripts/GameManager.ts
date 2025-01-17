// 公共管理类

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  private static _inst: GameManager = null; // 单例
  // 单例
  public static inst() {
    if (this._inst == null) {
      this._inst = new GameManager();
    }
    return this._inst;
  }

  // 移动速度
  @property
  moveSpeed: number = 100;

  // onLoad 会优先于 start 执行
  onLoad() {
    GameManager._inst = this;
  }

  start() {}

  update(deltaTime: number) {}
}
