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
}
