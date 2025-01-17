// 控制小鸟
import {
  _decorator,
  Component,
  Node,
  input,
  Input,
  RigidBody2D,
  Vec2,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
  private rgd2D: RigidBody2D = null;

  // 每一秒旋转的角度
  @property
  rotateSpeed: number = 30;

  onLoad() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  // 销毁
  onDestroy() {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  onTouchStart() {
    // 让小鸟抬头
    this.node.angle = 30;

    // 控制小鸟飞跃
    this.rgd2D.linearVelocity = new Vec2(0, 10); // 10 为向上的速度
  }

  protected start(): void {
    // 获取刚体组件
    this.rgd2D = this.getComponent(RigidBody2D);
  }

  protected update(deltaTime: number): void {
    // 旋转
    this.node.angle -= this.rotateSpeed * deltaTime;

    // 限制旋转角度
    if (this.node.angle < -this.rotateSpeed) {
      this.node.angle = -this.rotateSpeed;
    }
  }
}
