// 处理背景

import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MoveBg')
export class MoveBg extends Component {
  // 背景1
  @property(Node)
  target1ToMove: Node = null;

  // 背景2
  @property(Node)
  target2ToMove: Node = null;

  // 移动速度
  private moveSpeed: number = 100;

  start() {
    this.moveSpeed = GameManager.inst().moveSpeed;
  }

  update(deltaTime: number) {
    // deltaTime 两帧之间的时间间隔

    // 移动距离
    const moveDistance = this.moveSpeed * deltaTime;

    // 背景1移动
    let p1 = this.target1ToMove.getPosition();
    this.target1ToMove.setPosition(p1.x - moveDistance, p1.y);

    // 背景2移动
    let p2 = this.target2ToMove.getPosition();
    this.target2ToMove.setPosition(p2.x - moveDistance, p2.y);

    // 背景的宽度
    const bgWidth = 725;

    // 背景1移出屏幕后，将背景1放到背景2后面
    if (p1.x <= -bgWidth) {
      // 重新得到背景2的位置
      p2 = this.target2ToMove.getPosition();
      // 设置背景1的位置
      this.target1ToMove.setPosition(p2.x + bgWidth, p1.y);
    }

    // 背景2移出屏幕后，将背景2放到背景1后面
    if (p2.x <= -bgWidth) {
      // 重新得到背景1的位置
      p1 = this.target1ToMove.getPosition();
      // 设置背景2的位置
      this.target2ToMove.setPosition(p1.x + bgWidth, p2.y);
    }
  }
}
