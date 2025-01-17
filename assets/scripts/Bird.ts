// 控制小鸟
import {
  _decorator,
  Component,
  Node,
  input,
  Input,
  RigidBody2D,
  Vec2,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
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

    // 小鸟碰撞检测
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  // 碰撞开始
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log('otherCollider.tag=======>', otherCollider.tag);
  }

  // 碰撞结束
  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log('碰撞结束');
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
