import { _decorator, Component, Node, input, Input } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from '../GameManager';

@ccclass('GameReadyUi')
export class GameReadyUi extends Component {
  start() {}

  // 显示和隐藏
  private _isShow: boolean = false;

  onLoad() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  // 销毁
  onDestroy() {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  // 触摸开始
  onTouchStart() {
    console.log('onTouchStart');
    // 开始游戏
    GameManager.inst().transitionToGamingState();
  }

  update(deltaTime: number) {}

  // 设置显示和隐藏
  public setShow(isShow: boolean) {
    this._isShow = isShow;
    this.node.active = isShow;
  }
}
