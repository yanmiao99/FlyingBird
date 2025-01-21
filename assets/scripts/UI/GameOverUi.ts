import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUi')
export class GameOverUi extends Component {
  @property(Label)
  private curScoreLabel: Label = null; // 当前分

  @property(Label)
  private bestScoreLabel: Label = null; // 最高分

  @property(Node)
  newSprite: Node = null; // 新纪录

  @property(Node)
  Medal0: Node = null; // 无牌

  @property(Node)
  Medal1: Node = null; // 铜牌

  @property(Node)
  Medal2: Node = null; // 银牌

  @property(Node)
  Medal3: Node = null; // 金牌

  onLoad() {}

  update(deltaTime: number) {}

  public show(curScore: number, bestScore: number) {
    this.node.active = true;
    this.curScoreLabel.string = curScore.toString();
    this.bestScoreLabel.string = bestScore.toString();

    this.newSprite.active = curScore > bestScore; // 新纪录

    const medals = [this.Medal0, this.Medal1, this.Medal2, this.Medal3];
    medals.forEach((medal) => (medal.active = false));

    // 0-9 无牌 10-19 铜牌 20-29 银牌 30+ 金牌
    const medalIndex = Math.min(Math.floor(curScore / 10), 3);
    medals[medalIndex].active = true;
  }

  public hide() {
    this.node.active = false;
  }

  // 重新开始
  public onRestartBtnClick() {
    // 重新加载场景
    director.loadScene(director.getScene().name);
  }
}
