// 处理管道

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from './GameManager';

@ccclass('Pipe')
export class Pipe extends Component {
  // 移动速度
  private moveSpeed: number = 100;

  start() {
    this.moveSpeed = GameManager.inst().moveSpeed;
  }

  update(deltaTime: number) {
    // 获取位置
    const p = this.node.position;

    // 移动
    this.node.setPosition(p.x - this.moveSpeed * deltaTime, p.y);
  }
}
