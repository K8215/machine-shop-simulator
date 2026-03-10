export default class Operator {
  constructor({
    id,
    name,
    position,
    specialization,
    rank,
    experience,
    assignment,
    quirk,
  }) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.specialization = specialization;
    this.rank = rank;
    this.experience = experience;
    this.assignment = assignment;
    this.quirk = quirk;
  }

  draw(ctx, cycleTime, paused = false) {
    const centerX = 50;
    const centerY = 50;
    const radius = 12.5; // 25px diameter = 12.5px radius

    // Draw the circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "bronze";
    ctx.fill();
  }

  update(ctx) {
    (this.draw(ctx), cycleTime, (paused = false));
  }
}
