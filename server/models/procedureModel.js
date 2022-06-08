const db = require("../config/db");

// Contraindications DB table class
class Procedure {
  constructor(
    proc_id,
    proc_title_et,
    proc_title_ru,
    proc_title_en,
    proc_descr_et,
    proc_descr_ru,
    proc_descr_en,
    proc_duration,
    proc_price
  ) {
    this.proc_id = proc_id;
    this.proc_title_et = proc_title_et;
    this.proc_title_ru = proc_title_ru;
    this.proc_title_en = proc_title_en;
    this.proc_descr_et = proc_descr_et;
    this.proc_descr_ru = proc_descr_ru;
    this.proc_descr_en = proc_descr_en;
    this.proc_duration = proc_duration;
    this.proc_price = proc_price;
  }

  /**
   *  MySQL statements for Procedures Controller methods
   */

  // Procedures on Any Filters

  // // Procedures on Targets and Symptoms
  // static getAllProcOnTarAndSymp() {
  //   let sql = `SELECT procedures.proc_title_et, procedures.proc_descr_et, procedures.proc_duration, procedures.proc_price FROM procedures
  //   INNER JOIN procedures_targets INNER JOIN targets INNER JOIN procedures_symptoms INNER JOIN symptoms
  //   ON procedures.proc_id=procedures_targets.procedures_id AND procedures_targets.targets_id=targets.tar_id
  //   AND procedures.proc_id=procedures_symptoms.procedures_id AND procedures_symptoms.symptoms_id=symptoms.symp_id
  //   WHERE targets.tar_id IN (${tarIdsString}) AND symptoms.symp_id IN (${sympIdsString}) ORDER BY procedures.proc_price;`;
  //   return db.execute(sql);
  // }

  // Procedures On All Filters dynamically, if exists
  static async getAllProcOnTarAndSymp(tarIds, sympIds, disIds, priceMax) {
    let join = [];
    let where = [];
    let namedPlaceholders = {};

    if (tarIds) {
      join.push(
        `procedures_targets USING (proc_id) JOIN targets USING (tar_id)`
      );
      where.push(`tar_id IN (:clientsTargets)`);
      namedPlaceholders.clientsTargets = tarIds.toString();
    }

    if (sympIds) {
      join.push(
        `procedures_symptoms USING (proc_id) JOIN symptoms USING (symp_id)`
      );
      where.push(`symp_id IN (:clientsSymptoms)`); // placeholder
      namedPlaceholders.clientsSymptoms = sympIds.toString();
    }

    if (disIds) {
      join.push(
        `procedures_diseases USING (proc_id) JOIN diseases USING (dis_id)`
      );
      where.push(`dis_id NOT IN (:clientsDiseases)`);
      namedPlaceholders.clientsDiseases = disIds.toString();
    }

    if (priceMax) {
      where.push(`proc_price <= :clientsPrice`);
      namedPlaceholders.clientsPrice = Number(priceMax);
    }

    function implodeData(type, data, separator = " ") {
      data = data.join(" " + separator + " ");
      if (data.length) {
        data = type + " " + data;
      }
      return data;
    }

    join = implodeData("JOIN", join, "JOIN");
    where = implodeData("WHERE", where, "AND");

    const [rows] = await db.execute(
      `SELECT procedures.proc_title_et, procedures.proc_descr_et, procedures.proc_duration, procedures.proc_price 
   FROM procedures ${join} ${where} ORDER BY proc_price;`,
      namedPlaceholders
    );
    console.log(rows);
    return rows;
  }
}

module.exports = Procedure;
