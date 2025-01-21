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
  Animation,
  AudioClip,
} from 'cc';
const { ccclass, property } = _decorator;
import { Tags } from './Tags';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';

@ccclass('Bird')
export class Bird extends Component {
  private rgd2D: RigidBody2D = null;

  // 每一秒旋转的角度
  @property
  rotateSpeed: number = 30;

  // 引入背景音乐
  @property(AudioClip)
  clickMusic: AudioClip = null;

  // 是否能被控制
  private _canControl: boolean = false;

  onLoad() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

    // 小鸟碰撞检测
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    // 获取刚体组件
    this.rgd2D = this.getComponent(RigidBody2D);
  }

  // 碰撞开始
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // console.log('otherCollider.tag=======>', otherCollider.tag);

    // 碰到地面或者管道, 游戏结束
    if (otherCollider.tag === Tags.LAND || otherCollider.tag === Tags.PIPE) {
      GameManager.inst().transitionToGameOverState();
    }
  }

  // 碰撞结束
  onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // console.log('碰撞结束');

    // 得分
    if (otherCollider.tag === Tags.PIPE_MIDDLE) {
      GameManager.inst().addScore(1);
    }
  }

  // 销毁
  onDestroy() {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);

    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  onTouchStart() {
    if (!this._canControl) return;

    // 播放音效
    AudioMgr.inst.playOneShot(this.clickMusic);

    // 让小鸟抬头
    this.node.angle = 30;

    // 控制小鸟飞跃
    this.rgd2D.linearVelocity = new Vec2(0, 10); // 10 为向上的速度
  }

  protected start(): void {}

  protected update(deltaTime: number): void {
    if (!this._canControl) return;

    // 旋转
    this.node.angle -= this.rotateSpeed * deltaTime;

    // 限制旋转角度
    if (this.node.angle < -this.rotateSpeed) {
      this.node.angle = -this.rotateSpeed;
    }
  }

  // 设置是否能被控制
  public setCanControl(canControl: boolean, isGameOver: boolean = false) {
    if (!isGameOver) {
      // 如果不能被控制，刚体速度归零
      this.rgd2D.enabled = canControl;
    }

    // 是否能被控制
    this._canControl = canControl;

    // 控制动画
    this.getComponent(Animation).enabled = canControl;
  }
}
