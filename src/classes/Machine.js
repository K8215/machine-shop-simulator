import { machineSize, maxCondition, prodCycleRate } from "../data/settings.js";

export default class Machine {
  constructor({
    id,
    label,
    position,
    type,
    letter,
    price,
    prodRate,
    conditionModifier,
    active = true,
    breakdown = false,
    condition = maxCondition,
    selected = false,
  }) {
    this.id = id;
    this.label = label;
    this.position = position;
    this.type = type;
    this.letter = letter;
    this.price = price;
    this.prodRate = prodRate;
    this.conditionModifier = conditionModifier;
    this.active = active;
    this.breakdown = breakdown;
    this.condition = condition;
    this.selected = selected;
  }

  draw(ctx, cycleTime, paused = false) {
    let vibrationOffset = 0;
    // Stop vibration if paused
    if (!paused && this.active && typeof cycleTime === "number") {
      vibrationOffset = Math.sin((cycleTime / 1000) * 45 * Math.PI) * 1;
    }

    //Rectangle
    ctx.fillStyle = "grey";
    ctx.fillRect(
      this.position.x + vibrationOffset,
      this.position.y,
      machineSize,
      machineSize
    );

    //Letters
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.letter,
      this.position.x + machineSize / 2 + vibrationOffset,
      this.position.y + machineSize / 2
    );

    // Flash indicator at the start of each production cycle (for 1/4 of the cycle)
    let blink = false;
    if (!paused && typeof cycleTime === "number") {
      blink = cycleTime % prodCycleRate < prodCycleRate / 4;
    }

    if (blink) {
      const color = this.breakdown
        ? "red"
        : !this.active && !this.breakdown
        ? "orange"
        : "green";
      const value = this.breakdown
        ? "Breakdown!"
        : !this.active && !this.breakdown
        ? "Idle"
        : `$${this.prodRate}`;

      ctx.fillStyle = color;
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        value,
        this.position.x + machineSize / 2 + vibrationOffset,
        this.position.y - 10
      );
    }

    //Selection outline
    let stroke =
      this.selected && this.breakdown
        ? "red"
        : this.selected && !this.active && !this.breakdown
        ? "orange"
        : this.selected
        ? "green"
        : "grey";
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 5;
    ctx.strokeRect(
      this.position.x + vibrationOffset,
      this.position.y,
      machineSize,
      machineSize
    );
  }

  update(ctx, cycleTime, paused = false) {
    this.draw(ctx, cycleTime, paused);
  }
}
