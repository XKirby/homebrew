// 
// Table Builder for RtW Creatures
// 

let example = {
    head: {
        name: "Cheep Cheep, Common",
        rank: "Rank 1 Natural Hunter",
    },
    stats: {
        hp: "12",
        mp: "0",
        sp: "12",
        defense: "2", defense_type: "Civilian",
        concentration: "11",
        initiative: "+4",
        evasion: "14",
        size: "Small",
        vitality: "13",
        movement: "6 (Swimming), 1 (Walking)",
    },
    main_attacks: [
        {
            name: "Spurt Water",
            damage: "7",
            hit: "+8",
            range: "Projectile 4",
            details: "Description", //not required
        },
    ],
    abilities: [
        {
            name: "Arc Shot",
            type : "Reaction", //not required
            damage: "7, Water",
            cost: "4 Stamina",
            range: "Projectile 12-16",
            requirement: "Be cool", //not required
            description: "You may ignore allies, enemies and any obstacles that do not reach higher than 6 squares above you, for determining line of sight for this attack.",
        },
    ],
    weapons: [
        {
            name: "Cheep Water Spurt",
            rank: "Rank 1 Natural Rod, Water",
            ammo: "2x Bombs, 5x Blunt Arrows", //not required
            enchantment: "Something", //not required
            accuracy: "1",
            attack: "5",
            durability: "6",
        },
    ],
    passives: [
        {
            name: "Flying Fish",
            type: "Explanation",
            description: "While on the surface of the water, this creature can jump as if its Athletics were 5 points higher. (Horiz. 4; Vert. 3)",
        },
    ],
    traits: {
        informations: "Limited Intelligence, Undead",
        resistance: "", //not required
        immunity: "", //not required
        vulnerability : "", //not required
        power: {
            combat: 2,
            hearts: 3,
            athletics: 3,
            civilization: 0,
            fortitude: 3,
            intimidate: 1,
            mechanics: 0,
            smithing: 0,
        },
        wisdom: {
            willpower: 2,
            magic: 0,
            arcana: 1,
            perception: 1,
            influence: 1,
            discipline: 1,
            perform: 0,
            enchanting: 0,
        },
        courage: {
            accuracy: 4,
            stamina: 3,
            nature: 2,
            agility: 4,
            command: 0,
            insight: 1,
            guile: 1,
            cooking: 0,
        },
    },
    drops: [
        {
            name: "Cheep Cheep Meat",
            rank: "Rank 1 Food Ingredient", //not required
            quantity: 5, //not required
        },
        {
            name: "Weapons",
            rank: "when available",
            quantity: "",
        }
    ],
}

/*
** ---------------------------------------
** FUNCTION TO FETCH THE COMPLETED TABLE -
** ---------------------------------------
*/

function fetchFromElement(id, required = true) {
    let value = document.getElementById(id).value;
    if (value === "" && required === true) {
        let index = id.slice(3);
        let result_infos = document.getElementById("result_infos");
        if (fetchTableData.hasError === false) {
            let error_head = document.createElement("span");
            error_head.appendChild(document.createTextNode("ERROR: The build was cancelled because the following elements are required and can't be null:\n"));
            error_head.classList.add("error-info-bold");
            error_head.classList.add("text-red-200");
            result_infos.appendChild(error_head);
            result_infos.appendChild(document.createTextNode(index));
        } else {
            result_infos.appendChild(document.createTextNode(", " + index));
        }
        fetchTableData.hasError = true;
    }
    return value;
}

function fetchTableData() {
    fetchTableData.hasError = false;
    let data = {};

    data.head = {};
    data.head.name = fetchFromElement("id_name");
    data.head.rank = fetchFromElement("id_rank");

    data.stats = {}
    data.stats.hp = fetchFromElement("id_hp");
    data.stats.mp = fetchFromElement("id_mp");
    data.stats.sp = fetchFromElement("id_sp");
    data.stats.defense = fetchFromElement("id_defense");
    data.stats.defense_type = fetchFromElement("id_defense_type");
    data.stats.concentration = fetchFromElement("id_concentration");
    data.stats.initiative = fetchFromElement("id_initiative");
    data.stats.evasion = fetchFromElement("id_evasion");
    data.stats.vitality = fetchFromElement("id_vitality");
    data.stats.size = fetchFromElement("id_size");
    data.stats.movement = fetchFromElement("id_movement");

    data.main_attacks = [];
    for (let counter = 1; counter <= builderAddMainAttack.counter; ++counter) {
        let subdata = {};
        subdata.name = fetchFromElement("id_attack_name_" + counter);
        subdata.damage = fetchFromElement("id_attack_damage_" + counter);
        subdata.hit = fetchFromElement("id_attack_hit_" + counter);
        subdata.range = fetchFromElement("id_attack_range_" + counter);
        subdata.details = fetchFromElement("id_attack_details_" + counter, false);
        data.main_attacks.push(subdata);
    }

   data.abilities = [];
   for (let counter = 1; counter <= builderAddAbility.counter; ++counter) {
       let subdata = {};
       subdata.name = fetchFromElement("id_ability_name_" + counter);
       subdata.type = fetchFromElement("id_ability_type_" + counter, false);
       subdata.damage = fetchFromElement("id_ability_damage_" + counter);
       subdata.cost = fetchFromElement("id_ability_cost_" + counter);
       subdata.range = fetchFromElement("id_ability_range_" + counter);
       subdata.requirement = fetchFromElement("id_ability_requirement_" + counter, false);
       subdata.details = fetchFromElement("id_ability_details_" + counter);
       data.abilities.push(subdata);
   }

    data.weapons = [];
    for (let counter = 1; counter <= builderAddWeapon.counter; ++counter) {
       let subdata = {};
       subdata.name = fetchFromElement("id_weapon_name_" + counter);
       subdata.rank = fetchFromElement("id_weapon_rank_" + counter);
       subdata.ammo = fetchFromElement("id_weapon_ammo_" + counter, false);
       subdata.enchantment = fetchFromElement("id_weapon_ench_" + counter, false);
       subdata.accuracy = fetchFromElement("id_weapon_accuracy_" + counter);
       subdata.attack = fetchFromElement("id_weapon_attack_" + counter, false);
       subdata.durability = fetchFromElement("id_weapon_durability_" + counter);
       data.weapons.push(subdata);
    }

    data.passives = [];
    for (let counter = 1; counter <= builderAddPassive.counter; ++counter) {
        let subdata = {};
        subdata.name = fetchFromElement("id_passive_name_" + counter);
        subdata.type = fetchFromElement("id_passive_type_" + counter);
        subdata.details = fetchFromElement("id_passive_details_" + counter);
        data.passives.push(subdata);
    }
    
    data.traits = {};
    data.traits.informations = fetchFromElement("id_traits_infos");
    data.traits.resistance = fetchFromElement("id_traits_resistance", false);
    data.traits.immunity = fetchFromElement("id_traits_immunity", false);
    data.traits.vulnerability = fetchFromElement("id_traits_vulnerability", false);

    data.traits.power = {};
    data.traits.power.combat = fetchFromElement("id_traits_combat");
    data.traits.power.hearts = fetchFromElement("id_traits_hearts");
    data.traits.power.athletics = fetchFromElement("id_traits_athletics");
    data.traits.power.civilization = fetchFromElement("id_traits_civilization");
    data.traits.power.fortitude = fetchFromElement("id_traits_fortitude");
    data.traits.power.intimidate = fetchFromElement("id_traits_intimidate");
    data.traits.power.mechanics = fetchFromElement("id_traits_mechanics");
    data.traits.power.smithing = fetchFromElement("id_traits_smithing");

    data.traits.wisdom = {};
    data.traits.wisdom.willpower = fetchFromElement("id_traits_willpower");
    data.traits.wisdom.magic = fetchFromElement("id_traits_magic");
    data.traits.wisdom.arcana = fetchFromElement("id_traits_arcana");
    data.traits.wisdom.perception = fetchFromElement("id_traits_perception");
    data.traits.wisdom.influence = fetchFromElement("id_traits_influence");
    data.traits.wisdom.discipline = fetchFromElement("id_traits_discipline");
    data.traits.wisdom.perform = fetchFromElement("id_traits_perform");
    data.traits.wisdom.enchanting = fetchFromElement("id_traits_enchanting");

    data.traits.courage = {};
    data.traits.courage.accuracy = fetchFromElement("id_traits_accuracy");
    data.traits.courage.stamina = fetchFromElement("id_traits_stamina");
    data.traits.courage.nature = fetchFromElement("id_traits_nature");
    data.traits.courage.agility = fetchFromElement("id_traits_agility");
    data.traits.courage.command = fetchFromElement("id_traits_command");
    data.traits.courage.insight = fetchFromElement("id_traits_insight");
    data.traits.courage.guile = fetchFromElement("id_traits_guile");
    data.traits.courage.cooking = fetchFromElement("id_traits_cooking");

    data.drops = [];
    for (let counter = 1; counter <= builderAddDrop.counter; ++counter) {
        let subdata = {};
        subdata.quantity = fetchFromElement("id_drop_quantity_" + counter, false);
        subdata.name = fetchFromElement("id_drop_name_" + counter);
        subdata.rank = fetchFromElement("id_drop_rank_" + counter, false);
        data.drops.push(subdata);
    }

    return data;
}

/*
** ----------------------------------------
*/


function createDivInput(classes, used_id, label_text, input_placeholder) {
    let div = document.createElement("div");
    for (let element of classes) {
        div.classList.add(element);
    }
    let label = document.createElement("label");
    label.setAttribute("for", used_id);
    label.appendChild(document.createTextNode(label_text));
    let input = document.createElement("input");
    input.id = used_id;
    input.type = "text";
    input.placeholder = input_placeholder;
    div.appendChild(label);
    div.appendChild(input);
    return div;
}

function createDivTextarea(classes, used_id, label_text, input_placeholder, rows) {
    let div = document.createElement("div");
    for (let element of classes) {
        div.classList.add(element);
    }
    let label = document.createElement("label");
    label.setAttribute("for", used_id);
    label.appendChild(document.createTextNode(label_text));
    let input = document.createElement("textarea");
    input.id = used_id;
    input.rows = rows;
    input.placeholder = input_placeholder;
    div.appendChild(label);
    div.appendChild(input);
    return div;
}

/*
** ----------------------------------------
** FUNCTIONS TO ADD SECTIONS TO THE FORM --
** ----------------------------------------
*/

function builderAddMainAttack(removeLast = false) {
    if (typeof builderAddMainAttack.counter === 'undefined')
        builderAddMainAttack.counter = 0;
    if (removeLast === true) {
        if (builderAddMainAttack.counter === 0)
            return;
        let container = document.querySelector("#main_attacks");
        let elem_rem = container.querySelector("#main_attack_" + builderAddMainAttack.counter);
        elem_rem.remove();
        builderAddMainAttack.counter -= 1;
        return;
    }
    builderAddMainAttack.counter += 1;
    let main_el = document.createElement("div");
    main_el.id = "main_attack_" + builderAddMainAttack.counter;
    main_el.classList.add("downwards-margin");

    let form_name_dmg = document.createElement("form");
    form_name_dmg.appendChild(createDivInput(["large-input", "flex-grow-2"], "id_attack_name_" + builderAddMainAttack.counter, "Name*:", "Sword strike"));
    form_name_dmg.appendChild(createDivInput(["small-input"], "id_attack_damage_" + builderAddMainAttack.counter, "Damage*:", "42"));

    let form_hit_range = document.createElement("form");
    form_hit_range.appendChild(createDivInput(["small-input"], "id_attack_hit_" + builderAddMainAttack.counter, "To-Hit Check*:", "+8"));
    form_hit_range.appendChild(createDivInput(["large-input", "flex-grow-2"], "id_attack_range_" + builderAddMainAttack.counter, "Range*:", "Projectile 12-16"));
    
    let form_details = document.createElement("form");
    form_details.appendChild(createDivTextarea(["large-input"], "id_attack_details_" + builderAddMainAttack.counter, "Description/Side Effect:", "Description...", 1));

    main_el.appendChild(form_name_dmg);
    main_el.appendChild(form_hit_range);
    main_el.appendChild(form_details);

    let container = document.querySelector("#main_attacks");
    container.appendChild(main_el);
}

/*
** ----------------------------------------
*/

function builderAddAbility(removeLast = false) {
    if (typeof builderAddAbility.counter === 'undefined')
        builderAddAbility.counter = 0;
    if (removeLast === true) {
        if (builderAddAbility.counter === 0)
            return;
        let container = document.querySelector("#abilities_container");
        let elem_rem = container.querySelector("#ability_" + builderAddAbility.counter);
        elem_rem.remove();
        builderAddAbility.counter -= 1;
        return;
    }
    builderAddAbility.counter += 1;
    let main_el = document.createElement("div");
    main_el.id = "ability_" + builderAddAbility.counter;
    main_el.classList.add("downwards-margin");

    let form_name_dmg = document.createElement("form");
    form_name_dmg.appendChild(createDivInput(["large-input", "flex-grow-2"], "id_ability_name_" + builderAddAbility.counter, "Name*:", "Arc Shot"));
    form_name_dmg.appendChild(createDivInput(["large-input"], "id_ability_type_" + builderAddAbility.counter, "Type:", "Reaction (empty for Standard"));
    form_name_dmg.appendChild(createDivInput(["small-input"], "id_ability_damage_" + builderAddAbility.counter, "Damage*:", "42"));

    let form_hit_range = document.createElement("form");
    form_hit_range.appendChild(createDivInput(["small-input"], "id_ability_cost_" + builderAddAbility.counter, "Cost*:", "10 Stamina (Bind)"));
    form_hit_range.appendChild(createDivInput(["large-input", "flex-grow-2"], "id_ability_range_" + builderAddAbility.counter, "Range*:", "Projectile 12-16"));
    
    let form_requirement = document.createElement("form");
    form_requirement.appendChild(createDivInput(["large-input"], "id_ability_requirement_" + builderAddAbility.counter, "Use Requirement:", "Something..."));

    let form_details = document.createElement("form");
    form_details.appendChild(createDivTextarea(["large-input"], "id_ability_details_" + builderAddAbility.counter, "Description*:", "Description...", 3));

    main_el.appendChild(form_name_dmg);
    main_el.appendChild(form_hit_range);
    main_el.appendChild(form_requirement);
    main_el.appendChild(form_details);

    let container = document.querySelector("#abilities_container");
    container.appendChild(main_el);
}

/*
** ----------------------------------------
*/

function builderAddWeapon(removeLast = false) {
    if (typeof builderAddWeapon.counter === 'undefined')
        builderAddWeapon.counter = 0;
    if (removeLast === true) {
        if (builderAddWeapon.counter === 0)
            return;
        let container = document.querySelector("#weapons");
        let elem_rem = container.querySelector("#weapon_" + builderAddWeapon.counter);
        elem_rem.remove();
        builderAddWeapon.counter -= 1;
        return;
    }
    builderAddWeapon.counter += 1;
    let main_el = document.createElement("div");
    main_el.id = "weapon_" + builderAddWeapon.counter;
    main_el.classList.add("downwards-margin");

    let form_name_dmg = document.createElement("form");
    form_name_dmg.appendChild(createDivInput(["large-input"], "id_weapon_name_" + builderAddWeapon.counter, "Name*:", "Holy Rod of Wisdom"));
    form_name_dmg.appendChild(createDivInput(["large-input"], "id_weapon_rank_" + builderAddWeapon.counter, "Rank*:", "Rank 1 Natural Rod"));

    let form_ammo_ench = document.createElement("form");
    form_ammo_ench.appendChild(createDivInput(["large-input"], "id_weapon_ammo_" + builderAddWeapon.counter, "Ammunition:", "4x Bombs, 7x Arrows"));
    form_ammo_ench.appendChild(createDivInput(["large-input"], "id_weapon_ench_" + builderAddWeapon.counter, "Enchantment:", "Perfectly Balanced, Rank 2 (+1 Crit)"));

    let form_hit_range = document.createElement("form");
    form_hit_range.appendChild(createDivInput(["small-input"], "id_weapon_accuracy_" + builderAddWeapon.counter, "Accuracy*:", "0"));
    form_hit_range.appendChild(createDivInput(["small-input"], "id_weapon_attack_" + builderAddWeapon.counter, "Attack*:", "0"));
    form_hit_range.appendChild(createDivInput(["small-input"], "id_weapon_durability_" + builderAddWeapon.counter, "Durability*:", "0"));
    
    main_el.appendChild(form_name_dmg);
    main_el.appendChild(form_ammo_ench);
    main_el.appendChild(form_hit_range);

    let container = document.querySelector("#weapons");
    container.appendChild(main_el);
}

/*
** ----------------------------------------
*/

function builderAddPassive(removeLast = false) {
    if (typeof builderAddPassive.counter === 'undefined')
        builderAddPassive.counter = 0;
    if (removeLast === true) {
        if (builderAddPassive.counter === 0)
            return;
        let container = document.querySelector("#passives");
        let elem_rem = container.querySelector("#passive_" + builderAddPassive.counter);
        elem_rem.remove();
        builderAddPassive.counter -= 1;
        return;
    }
    builderAddPassive.counter += 1;
    let main_el = document.createElement("div");
    main_el.id = "passive_" + builderAddPassive.counter;
    main_el.classList.add("downwards-margin");

    let form_name_dmg = document.createElement("form");
    form_name_dmg.appendChild(createDivInput(["large-input", "flex-grow-2"], "id_passive_name_" + builderAddPassive.counter, "Name*:", "Flying Fish"));
    form_name_dmg.appendChild(createDivInput(["small-input"], "id_passive_type_" + builderAddPassive.counter, "Type*:", "Passive/Weak Point"));

    let form_details = document.createElement("form");
    form_details.appendChild(createDivTextarea(["large-input"], "id_passive_details_" + builderAddPassive.counter, "Description*:", "Description...", 3));
    
    main_el.appendChild(form_name_dmg);
    main_el.appendChild(form_details);

    let container = document.querySelector("#passives");
    container.appendChild(main_el);
}

/*
** ----------------------------------------
*/

function builderAddDrop(removeLast = false) {
    if (typeof builderAddDrop.counter === 'undefined')
        builderAddDrop.counter = 0;
    if (removeLast === true) {
        if (builderAddDrop.counter === 0)
            return;
        let container = document.querySelector("#drops_container");
        let elem_rem = container.querySelector("#drop_" + builderAddDrop.counter);
        elem_rem.remove();
        builderAddDrop.counter -= 1;
        return;
    }
    builderAddDrop.counter += 1;
    let main_el = document.createElement("div");
    main_el.id = "drop_" + builderAddDrop.counter;

    let form = document.createElement("form");
    form.appendChild(createDivInput(["small-input"], "id_drop_quantity_" + builderAddDrop.counter, "Quantity:", "5"));
    form.appendChild(createDivInput(["large-input", "flex-grow-3"], "id_drop_name_" + builderAddDrop.counter, "Name*:", "Cheep Cheep Meat"));
    form.appendChild(createDivInput(["large-input", "flex-grow-3"], "id_drop_rank_" + builderAddDrop.counter, "Rank/Details:", "Rank 1 Meat, Spongy"));

    main_el.appendChild(form);

    let container = document.querySelector("#drops_container");
    container.appendChild(main_el);
}

/*
** ----------------------------------------
*/

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row_name = thead.insertRow();
    let th_name = document.createElement("th");
    let text_name = document.createTextNode(data.head.name);
    th_name.colSpan = "6";
    th_name.appendChild(text_name);
    row_name.appendChild(th_name);
    let row_rank = thead.insertRow();
    let th_rank = document.createElement("th");
    let text_rank = document.createTextNode(data.head.rank);
    th_rank.colSpan = "6";
    th_rank.appendChild(text_rank);
    row_rank.appendChild(th_rank);
    th_name.classList.add("fs-6");
    th_name.classList.add("text-grey-lt-000");
    th_name.classList.add("creature-title-bg");
    th_rank.classList.add("fs-5");
    th_rank.classList.add("text-grey-lt-000");
    th_rank.classList.add("creature-title-bg");
}

function generateTableBodyStats(table, data) {

    let row_p = table.insertRow();
    let cell_hp = row_p.insertCell();
    cell_hp.classList.add("text-grey-dk-300");
    cell_hp.classList.add("creature-content-bg-dark");
    cell_hp.colSpan = "2";
    let hp_strong = document.createElement("strong");
    hp_strong.appendChild(document.createTextNode("HP"));
    cell_hp.appendChild(hp_strong);
    cell_hp.appendChild(document.createTextNode(": " + data.stats.hp));
    let cell_mp = row_p.insertCell();
    cell_mp.classList.add("text-grey-dk-300");
    cell_mp.classList.add("creature-content-bg-dark");
    cell_mp.colSpan = "2";
    let mp_strong = document.createElement("strong");
    mp_strong.appendChild(document.createTextNode("MP"));
    cell_mp.appendChild(mp_strong);
    cell_mp.appendChild(document.createTextNode(": " + data.stats.mp));
    let cell_sp = row_p.insertCell();
    cell_sp.classList.add("text-grey-dk-300");
    cell_sp.classList.add("creature-content-bg-dark");
    cell_sp.colSpan = "2";
    let sp_strong = document.createElement("strong");
    sp_strong.appendChild(document.createTextNode("SP"));
    cell_sp.appendChild(sp_strong);
    cell_sp.appendChild(document.createTextNode(": " + data.stats.sp));

    let row_s1 = table.insertRow();
    let cell_def = row_s1.insertCell();
    cell_def.classList.add("text-grey-dk-300");
    cell_def.classList.add("creature-content-bg-light");
    cell_def.colSpan = "3";
    cell_def.appendChild(document.createTextNode("Defense: " + 
                                                data.stats.defense + 
                                                " (" + data.stats.defense_type + ")"));
    let cell_con = row_s1.insertCell();
    cell_con.classList.add("text-grey-dk-300");
    cell_con.classList.add("creature-content-bg-light");
    cell_con.colSpan = "3";
    cell_con.appendChild(document.createTextNode("Concentration: " +
                                                data.stats.concentration));
    
    let row_s2 = table.insertRow();
    let cell_ini = row_s2.insertCell();
    cell_ini.classList.add("text-grey-dk-300");
    cell_ini.classList.add("creature-content-bg-light");
    cell_ini.colSpan = "3";
    cell_ini.appendChild(document.createTextNode("Initiative: " + 
                                                data.stats.initiative));
    let cell_eva = row_s2.insertCell();
    cell_eva.classList.add("text-grey-dk-300");
    cell_eva.classList.add("creature-content-bg-light");
    cell_eva.colSpan = "3";
    cell_eva.appendChild(document.createTextNode("Evasion: " +
                                                data.stats.evasion));

    let row_s3 = table.insertRow();
    let cell_size = row_s3.insertCell();
    cell_size.classList.add("text-grey-dk-300");
    cell_size.classList.add("creature-content-bg-light");
    cell_size.colSpan = "3";
    cell_size.appendChild(document.createTextNode("Size: " + 
                                                data.stats.size));
    let cell_vit = row_s3.insertCell();
    cell_vit.classList.add("text-grey-dk-300");
    cell_vit.classList.add("creature-content-bg-light");
    cell_vit.colSpan = "3";
    cell_vit.appendChild(document.createTextNode("Vitality: " +
                                                data.stats.vitality));

    let row_s4 = table.insertRow();
    let cell_mov = row_s4.insertCell();
    cell_mov.classList.add("text-grey-dk-300");
    cell_mov.classList.add("creature-content-bg-light");
    cell_mov.colSpan = "6";
    cell_mov.appendChild(document.createTextNode("Movement: " + 
                                                data.stats.movement));
}

function generateTableNormalAttack(table, data) {
    for (let element of data.main_attacks) {
        let row_1 = table.insertRow();
        let cell_name = row_1.insertCell();
        cell_name.classList.add("text-grey-dk-300");
        cell_name.classList.add("creature-content-bg-dark");
        cell_name.colSpan = "3";
        let cell_name_strong = document.createElement("strong");
        cell_name_strong.appendChild(document.createTextNode(element.name));
        cell_name.appendChild(cell_name_strong);
        let cell_dmg = row_1.insertCell();
        cell_dmg.classList.add("text-grey-dk-300");
        cell_dmg.classList.add("creature-content-bg-dark");
        cell_dmg.colSpan = "3";
        cell_dmg.appendChild(document.createTextNode("Damage: " + element.damage));
    
        let row_2 = table.insertRow();
        let cell_hit = row_2.insertCell();
        cell_hit.classList.add("text-grey-dk-300");
        cell_hit.classList.add("creature-content-bg-dark");
        cell_hit.colSpan = "3";
        cell_hit.appendChild(document.createTextNode("To-Hit Check: " + element.hit));
        let cell_ran = row_2.insertCell();
        cell_ran.classList.add("text-grey-dk-300");
        cell_ran.classList.add("creature-content-bg-dark");
        cell_ran.colSpan = "3";
        cell_ran.appendChild(document.createTextNode("Range: " + element.range));
    
        let row_3 = table.insertRow();
        let cell_details = row_3.insertCell();
        cell_details.classList.add("text-grey-dk-300");
        cell_details.classList.add("creature-content-bg-dark");
        cell_details.classList.add("fs-2");
        cell_details.colSpan = "6";
        cell_details.appendChild(document.createTextNode(element.details));
    }
}

function generateTableAbilities(table, data) {
    for (let element of data.abilities) {
        let row_1 = table.insertRow();
        let cell_name = row_1.insertCell();
        cell_name.classList.add("text-grey-dk-300");
        cell_name.classList.add("creature-content-bg-light");
        cell_name.colSpan = "3";
        let cell_name_strong = document.createElement("strong");
        cell_name_strong.appendChild(document.createTextNode(element.name));
        cell_name.appendChild(cell_name_strong);
        let cell_dmg = row_1.insertCell();
        cell_dmg.classList.add("text-grey-dk-300");
        cell_dmg.classList.add("creature-content-bg-light");
        cell_dmg.colSpan = "3";
        cell_dmg.appendChild(document.createTextNode("Damage: " +
                                                    element.damage));
        if (element.type || 0 !== element.type.length) {
            let row_1_bis = table.insertRow();
            cell_dmg.rowSpan = "2";
            let cell_type = row_1_bis.insertCell();
            cell_type.classList.add("text-grey-dk-300");
            cell_type.classList.add("creature-content-bg-light");
            cell_type.colSpan = "3";
            cell_type.appendChild(document.createTextNode("(" + element.type + ")"));
        }

        let row_2 = table.insertRow();
        row_2.classList.add("text-grey-dk-300");
        row_2.classList.add("creature-content-bg-light");
        let cell_cost = row_2.insertCell();
        cell_cost.classList.add("text-grey-dk-300");
        cell_cost.classList.add("creature-content-bg-light");
        cell_cost.colSpan = "3";
        cell_cost.appendChild(document.createTextNode(element.cost));
        let cell_ran = row_2.insertCell();
        cell_ran.classList.add("text-grey-dk-300");
        cell_ran.classList.add("creature-content-bg-light");
        cell_ran.colSpan = "3";
        cell_ran.appendChild(document.createTextNode("Range: " +
                                                    element.range));

        if (element.requirement || 0 !== element.requirement.length) {
            let row_3_pre = table.insertRow();
            let cell_requirement = row_3_pre.insertCell();
            cell_requirement.classList.add("text-grey-dk-300");
            cell_requirement.classList.add("creature-content-bg-light");
            cell_requirement.colSpan = "6";
            let requirement_strong = document.createElement("strong");
            requirement_strong.appendChild(document.createTextNode("Use Requirement: "));
            cell_requirement.appendChild(requirement_strong);
            cell_requirement.appendChild(document.createTextNode(element.requirement));
        }

        let row_3 = table.insertRow();
        let cell_desc = row_3.insertCell();
        cell_desc.classList.add("text-grey-dk-300");
        cell_desc.classList.add("creature-content-bg-light");
        cell_desc.classList.add("fs-2");
        cell_desc.colSpan = "6";
        cell_desc.appendChild(document.createTextNode(element.details));
    }
}

function generateTableDefaultWeapon(table, data) {
    let first_element = true;
    for (let element of data.weapons) {
        let row_1 = table.insertRow();
        let cell_name = row_1.insertCell();
        cell_name.classList.add("text-grey-dk-300");
        cell_name.classList.add("creature-content-bg-dark");
        cell_name.colSpan = "6";
        if (first_element === true) {
            let weap_strong = document.createElement("strong");
            weap_strong.appendChild(document.createTextNode("Default Weapon: "));
            cell_name.appendChild(weap_strong);
            first_element = false;
        }
        cell_name.appendChild(document.createTextNode(element.name));
    
        let row_2 = table.insertRow();
        let cell_rank = row_2.insertCell();
        cell_rank.classList.add("text-grey-dk-300");
        cell_rank.classList.add("creature-content-bg-dark");
        cell_rank.colSpan = "6";
        cell_rank.appendChild(document.createTextNode("(" + element.rank + ")"));
    
        if (element.ammo || 0 != element.ammo.length) {
            let row_3_pre_1 = table.insertRow();
            let cell_ammo = row_3_pre_1.insertCell();
            cell_ammo.classList.add("text-grey-dk-300");
            cell_ammo.classList.add("creature-content-bg-dark");
            cell_ammo.colSpan = "6";
            let ammo_strong = document.createElement("strong");
            ammo_strong.appendChild(document.createTextNode("Ammunition: "));
            cell_ammo.appendChild(ammo_strong);
            cell_ammo.appendChild(document.createTextNode(element.ammo));
        }
        
        if (element.enchantment || 0 !== element.enchantment.length) {
            let row_3_pre_2 = table.insertRow();
            let cell_ench = row_3_pre_2.insertCell();
            cell_ench.classList.add("text-grey-dk-300");
            cell_ench.classList.add("creature-content-bg-dark");
            cell_ench.colSpan = "6";
            cell_ench.appendChild(document.createTextNode("Enchantment: " + element.enchantment));
        }

        let row_3 = table.insertRow();
        let cell_acc = row_3.insertCell();
        cell_acc.classList.add("text-grey-dk-300");
        cell_acc.classList.add("creature-content-bg-dark");
        cell_acc.colSpan = "2";
        cell_acc.appendChild(document.createTextNode("Accuracy: " + element.accuracy));
        let cell_atk = row_3.insertCell();
        cell_atk.classList.add("text-grey-dk-300");
        cell_atk.classList.add("creature-content-bg-dark");
        cell_atk.colSpan = "2";
        cell_atk.appendChild(document.createTextNode("Attack: " + element.attack));
        let cell_dur = row_3.insertCell();
        cell_dur.classList.add("text-grey-dk-300");
        cell_dur.classList.add("creature-content-bg-dark");
        cell_dur.colSpan = "2";
        cell_dur.appendChild(document.createTextNode("Durability: " + element.durability));
    }
}

function generateTablePassives(table, data) {
    for (let element of data.passives) {
        let row_1 = table.insertRow();
        let cell_name = row_1.insertCell();
        cell_name.classList.add("text-grey-dk-300");
        cell_name.classList.add("creature-content-bg-light");
        cell_name.colSpan = "6";
        let pas_strong = document.createElement("strong");
        pas_strong.appendChild(document.createTextNode(element.name));
        cell_name.appendChild(pas_strong);
        cell_name.appendChild(document.createTextNode(" (" + element.type + ")"));

        let row_2 = table.insertRow();
        let cell_desc = row_2.insertCell();
        cell_desc.classList.add("text-grey-dk-300");
        cell_desc.classList.add("creature-content-bg-light");
        cell_desc.classList.add("fs-2");
        cell_desc.colSpan = "6";
        cell_desc.appendChild(document.createTextNode(element.details));
    }
}

function generateTableTraits(table, data) {
    let traits = data.traits;
    let row_inf = table.insertRow();
    let cell_name = row_inf.insertCell();
    cell_name.classList.add("text-grey-dk-300");
    cell_name.classList.add("creature-content-bg-dark");
    cell_name.classList.add("fs-4");
    cell_name.colSpan = "6";
    cell_name.appendChild(document.createTextNode(traits.informations));

    if (traits.resistance || 0 !== traits.resistance.length) {
        let row_res = table.insertRow();
        let cell_res = row_res.insertCell();
        cell_res.classList.add("text-grey-dk-300");
        cell_res.classList.add("creature-content-bg-dark");
        cell_res.classList.add("fs-4");
        cell_res.colSpan = "6";
        cell_res.appendChild(document.createTextNode("Resistance: " + traits.resistance));
    }

    if (traits.immunity || 0 !== traits.immunity.length) {
        let row_immu = table.insertRow();
        let cell_immu = row_immu.insertCell();
        cell_immu.classList.add("text-grey-dk-300");
        cell_immu.classList.add("creature-content-bg-dark");
        cell_immu.classList.add("fs-4");
        cell_immu.colSpan = "6";
        cell_immu.appendChild(document.createTextNode("Immunity: " + traits.immunity));
    }

    if (traits.vulnerability || 0 !== traits.vulnerability.length) {
        let row_vuln = table.insertRow();
        let cell_vuln = row_vuln.insertCell();
        cell_vuln.classList.add("text-grey-dk-300");
        cell_vuln.classList.add("creature-content-bg-dark");
        cell_vuln.classList.add("fs-4");
        cell_vuln.colSpan = "6";
        cell_vuln.appendChild(document.createTextNode("Vulnerability: " + traits.vulnerability));
    }
    
    let row_1 = table.insertRow();
    let cell_1_1 = row_1.insertCell();
    cell_1_1.appendChild(document.createTextNode("Combat"));
    let cell_1_2 = row_1.insertCell();
    cell_1_2.appendChild(document.createTextNode(traits.power.combat));
    let cell_1_3 = row_1.insertCell();
    cell_1_3.appendChild(document.createTextNode("Willpower"));
    let cell_1_4 = row_1.insertCell();
    cell_1_4.appendChild(document.createTextNode(traits.wisdom.willpower));
    let cell_1_5 = row_1.insertCell();
    cell_1_5.appendChild(document.createTextNode("Accuracy"));
    let cell_1_6 = row_1.insertCell();
    cell_1_6.appendChild(document.createTextNode(traits.courage.accuracy));

    let row_2 = table.insertRow();
    row_2.classList.add("text-grey-dk-300");
    row_2.classList.add("creature-content-bg-dark");
    row_2.classList.add("fs-2");
    let cell_2_1 = row_2.insertCell();
    cell_2_1.appendChild(document.createTextNode("Hearts"));
    let cell_2_2 = row_2.insertCell();
    cell_2_2.appendChild(document.createTextNode(traits.power.hearts));
    let cell_2_3 = row_2.insertCell();
    cell_2_3.appendChild(document.createTextNode("Magic"));
    let cell_2_4 = row_2.insertCell();
    cell_2_4.appendChild(document.createTextNode(traits.wisdom.magic));
    let cell_2_5 = row_2.insertCell();
    cell_2_5.appendChild(document.createTextNode("Stamina"));
    let cell_2_6 = row_2.insertCell();
    cell_2_6.appendChild(document.createTextNode(traits.courage.stamina));

    let row_3 = table.insertRow();
    row_3.classList.add("text-grey-dk-300");
    row_3.classList.add("creature-content-bg-dark");
    row_3.classList.add("fs-2");
    let cell_3_1 = row_3.insertCell();
    cell_3_1.appendChild(document.createTextNode("Athletics"));
    let cell_3_2 = row_3.insertCell();
    cell_3_2.appendChild(document.createTextNode(traits.power.athletics));
    let cell_3_3 = row_3.insertCell();
    cell_3_3.appendChild(document.createTextNode("Arcana"));
    let cell_3_4 = row_3.insertCell();
    cell_3_4.appendChild(document.createTextNode(traits.wisdom.arcana));
    let cell_3_5 = row_3.insertCell();
    cell_3_5.appendChild(document.createTextNode("Nature"));
    let cell_3_6 = row_3.insertCell();
    cell_3_6.appendChild(document.createTextNode(traits.courage.nature));

    let row_4 = table.insertRow();
    row_4.classList.add("text-grey-dk-300");
    row_4.classList.add("creature-content-bg-dark");
    row_4.classList.add("fs-2");
    let cell_4_1 = row_4.insertCell();
    cell_4_1.appendChild(document.createTextNode("Civilization"));
    let cell_4_2 = row_4.insertCell();
    cell_4_2.appendChild(document.createTextNode(traits.power.civilization));
    let cell_4_3 = row_4.insertCell();
    cell_4_3.appendChild(document.createTextNode("Perception"));
    let cell_4_4 = row_4.insertCell();
    cell_4_4.appendChild(document.createTextNode(traits.wisdom.perception));
    let cell_4_5 = row_4.insertCell();
    cell_4_5.appendChild(document.createTextNode("Agility"));
    let cell_4_6 = row_4.insertCell();
    cell_4_6.appendChild(document.createTextNode(traits.courage.agility));

    let row_5 = table.insertRow();
    row_5.classList.add("text-grey-dk-300");
    row_5.classList.add("creature-content-bg-dark");
    row_5.classList.add("fs-2");
    let cell_5_1 = row_5.insertCell();
    cell_5_1.appendChild(document.createTextNode("Fortitude"));
    let cell_5_2 = row_5.insertCell();
    cell_5_2.appendChild(document.createTextNode(traits.power.fortitude));
    let cell_5_3 = row_5.insertCell();
    cell_5_3.appendChild(document.createTextNode("Influence"));
    let cell_5_4 = row_5.insertCell();
    cell_5_4.appendChild(document.createTextNode(traits.wisdom.influence));
    let cell_5_5 = row_5.insertCell();
    cell_5_5.appendChild(document.createTextNode("Command"));
    let cell_5_6 = row_5.insertCell();
    cell_5_6.appendChild(document.createTextNode(traits.courage.command));

    let row_6 = table.insertRow();
    row_6.classList.add("text-grey-dk-300");
    row_6.classList.add("creature-content-bg-dark");
    row_6.classList.add("fs-2");
    let cell_6_1 = row_6.insertCell();
    cell_6_1.appendChild(document.createTextNode("Intimidate"));
    let cell_6_2 = row_6.insertCell();
    cell_6_2.appendChild(document.createTextNode(traits.power.intimidate));
    let cell_6_3 = row_6.insertCell();
    cell_6_3.appendChild(document.createTextNode("Discipline"));
    let cell_6_4 = row_6.insertCell();
    cell_6_4.appendChild(document.createTextNode(traits.wisdom.discipline));
    let cell_6_5 = row_6.insertCell();
    cell_6_5.appendChild(document.createTextNode("Insight"));
    let cell_6_6 = row_6.insertCell();
    cell_6_6.appendChild(document.createTextNode(traits.courage.insight));

    let row_7 = table.insertRow();
    row_7.classList.add("text-grey-dk-300");
    row_7.classList.add("creature-content-bg-dark");
    row_7.classList.add("fs-2");
    let cell_7_1 = row_7.insertCell();
    cell_7_1.appendChild(document.createTextNode("Mechanics"));
    let cell_7_2 = row_7.insertCell();
    cell_7_2.appendChild(document.createTextNode(traits.power.mechanics));
    let cell_7_3 = row_7.insertCell();
    cell_7_3.appendChild(document.createTextNode("Perform"));
    let cell_7_4 = row_7.insertCell();
    cell_7_4.appendChild(document.createTextNode(traits.wisdom.perform));
    let cell_7_5 = row_7.insertCell();
    cell_7_5.appendChild(document.createTextNode("Guile"));
    let cell_7_6 = row_7.insertCell();
    cell_7_6.appendChild(document.createTextNode(traits.courage.guile));

    let row_8 = table.insertRow();
    row_8.classList.add("text-grey-dk-300");
    row_8.classList.add("creature-content-bg-dark");
    row_8.classList.add("fs-2");
    let cell_8_1 = row_8.insertCell();
    cell_8_1.appendChild(document.createTextNode("Smithing"));
    let cell_8_2 = row_8.insertCell();
    cell_8_2.appendChild(document.createTextNode(traits.power.smithing));
    let cell_8_3 = row_8.insertCell();
    cell_8_3.appendChild(document.createTextNode("Enchanting"));
    let cell_8_4 = row_8.insertCell();
    cell_8_4.appendChild(document.createTextNode(traits.wisdom.enchanting));
    let cell_8_5 = row_8.insertCell();
    cell_8_5.appendChild(document.createTextNode("Cooking"));
    let cell_8_6 = row_8.insertCell();
    cell_8_6.appendChild(document.createTextNode(traits.courage.cooking));

    cell_1_1.classList.add("text-grey-dk-300");
    cell_1_1.classList.add("creature-content-bg-dark");
    cell_1_1.classList.add("fs-2");

    cell_1_2.classList.add("text-grey-dk-300");
    cell_1_2.classList.add("creature-content-bg-dark");
    cell_1_2.classList.add("fs-2");

    cell_1_3.classList.add("text-grey-dk-300");
    cell_1_3.classList.add("creature-content-bg-dark");
    cell_1_3.classList.add("fs-2");

    cell_1_4.classList.add("text-grey-dk-300");
    cell_1_4.classList.add("creature-content-bg-dark");
    cell_1_4.classList.add("fs-2");

    cell_1_5.classList.add("text-grey-dk-300");
    cell_1_5.classList.add("creature-content-bg-dark");
    cell_1_5.classList.add("fs-2");

    cell_1_6.classList.add("text-grey-dk-300");
    cell_1_6.classList.add("creature-content-bg-dark");
    cell_1_6.classList.add("fs-2");

    cell_2_1.classList.add("text-grey-dk-300");
    cell_2_1.classList.add("creature-content-bg-dark");
    cell_2_1.classList.add("fs-2");

    cell_2_2.classList.add("text-grey-dk-300");
    cell_2_2.classList.add("creature-content-bg-dark");
    cell_2_2.classList.add("fs-2");

    cell_2_3.classList.add("text-grey-dk-300");
    cell_2_3.classList.add("creature-content-bg-dark");
    cell_2_3.classList.add("fs-2");

    cell_2_4.classList.add("text-grey-dk-300");
    cell_2_4.classList.add("creature-content-bg-dark");
    cell_2_4.classList.add("fs-2");

    cell_2_5.classList.add("text-grey-dk-300");
    cell_2_5.classList.add("creature-content-bg-dark");
    cell_2_5.classList.add("fs-2");

    cell_2_6.classList.add("text-grey-dk-300");
    cell_2_6.classList.add("creature-content-bg-dark");
    cell_2_6.classList.add("fs-2");

    cell_3_1.classList.add("text-grey-dk-300");
    cell_3_1.classList.add("creature-content-bg-dark");
    cell_3_1.classList.add("fs-2");

    cell_3_2.classList.add("text-grey-dk-300");
    cell_3_2.classList.add("creature-content-bg-dark");
    cell_3_2.classList.add("fs-2");

    cell_3_3.classList.add("text-grey-dk-300");
    cell_3_3.classList.add("creature-content-bg-dark");
    cell_3_3.classList.add("fs-2");

    cell_3_4.classList.add("text-grey-dk-300");
    cell_3_4.classList.add("creature-content-bg-dark");
    cell_3_4.classList.add("fs-2");

    cell_3_5.classList.add("text-grey-dk-300");
    cell_3_5.classList.add("creature-content-bg-dark");
    cell_3_5.classList.add("fs-2");

    cell_3_6.classList.add("text-grey-dk-300");
    cell_3_6.classList.add("creature-content-bg-dark");
    cell_3_6.classList.add("fs-2");

    cell_4_1.classList.add("text-grey-dk-300");
    cell_4_1.classList.add("creature-content-bg-dark");
    cell_4_1.classList.add("fs-2");

    cell_4_2.classList.add("text-grey-dk-300");
    cell_4_2.classList.add("creature-content-bg-dark");
    cell_4_2.classList.add("fs-2");

    cell_4_3.classList.add("text-grey-dk-300");
    cell_4_3.classList.add("creature-content-bg-dark");
    cell_4_3.classList.add("fs-2");

    cell_4_4.classList.add("text-grey-dk-300");
    cell_4_4.classList.add("creature-content-bg-dark");
    cell_4_4.classList.add("fs-2");

    cell_4_5.classList.add("text-grey-dk-300");
    cell_4_5.classList.add("creature-content-bg-dark");
    cell_4_5.classList.add("fs-2");

    cell_4_6.classList.add("text-grey-dk-300");
    cell_4_6.classList.add("creature-content-bg-dark");
    cell_4_6.classList.add("fs-2");

    cell_5_1.classList.add("text-grey-dk-300");
    cell_5_1.classList.add("creature-content-bg-dark");
    cell_5_1.classList.add("fs-2");

    cell_5_2.classList.add("text-grey-dk-300");
    cell_5_2.classList.add("creature-content-bg-dark");
    cell_5_2.classList.add("fs-2");

    cell_5_3.classList.add("text-grey-dk-300");
    cell_5_3.classList.add("creature-content-bg-dark");
    cell_5_3.classList.add("fs-2");

    cell_5_4.classList.add("text-grey-dk-300");
    cell_5_4.classList.add("creature-content-bg-dark");
    cell_5_4.classList.add("fs-2");

    cell_5_5.classList.add("text-grey-dk-300");
    cell_5_5.classList.add("creature-content-bg-dark");
    cell_5_5.classList.add("fs-2");

    cell_5_6.classList.add("text-grey-dk-300");
    cell_5_6.classList.add("creature-content-bg-dark");
    cell_5_6.classList.add("fs-2");

    cell_6_1.classList.add("text-grey-dk-300");
    cell_6_1.classList.add("creature-content-bg-dark");
    cell_6_1.classList.add("fs-2");

    cell_6_2.classList.add("text-grey-dk-300");
    cell_6_2.classList.add("creature-content-bg-dark");
    cell_6_2.classList.add("fs-2");

    cell_6_3.classList.add("text-grey-dk-300");
    cell_6_3.classList.add("creature-content-bg-dark");
    cell_6_3.classList.add("fs-2");

    cell_6_4.classList.add("text-grey-dk-300");
    cell_6_4.classList.add("creature-content-bg-dark");
    cell_6_4.classList.add("fs-2");

    cell_6_5.classList.add("text-grey-dk-300");
    cell_6_5.classList.add("creature-content-bg-dark");
    cell_6_5.classList.add("fs-2");

    cell_6_6.classList.add("text-grey-dk-300");
    cell_6_6.classList.add("creature-content-bg-dark");
    cell_6_6.classList.add("fs-2");

    cell_7_1.classList.add("text-grey-dk-300");
    cell_7_1.classList.add("creature-content-bg-dark");
    cell_7_1.classList.add("fs-2");

    cell_7_2.classList.add("text-grey-dk-300");
    cell_7_2.classList.add("creature-content-bg-dark");
    cell_7_2.classList.add("fs-2");

    cell_7_3.classList.add("text-grey-dk-300");
    cell_7_3.classList.add("creature-content-bg-dark");
    cell_7_3.classList.add("fs-2");

    cell_7_4.classList.add("text-grey-dk-300");
    cell_7_4.classList.add("creature-content-bg-dark");
    cell_7_4.classList.add("fs-2");

    cell_7_5.classList.add("text-grey-dk-300");
    cell_7_5.classList.add("creature-content-bg-dark");
    cell_7_5.classList.add("fs-2");

    cell_7_6.classList.add("text-grey-dk-300");
    cell_7_6.classList.add("creature-content-bg-dark");
    cell_7_6.classList.add("fs-2");

    cell_8_1.classList.add("text-grey-dk-300");
    cell_8_1.classList.add("creature-content-bg-dark");
    cell_8_1.classList.add("fs-2");

    cell_8_2.classList.add("text-grey-dk-300");
    cell_8_2.classList.add("creature-content-bg-dark");
    cell_8_2.classList.add("fs-2");

    cell_8_3.classList.add("text-grey-dk-300");
    cell_8_3.classList.add("creature-content-bg-dark");
    cell_8_3.classList.add("fs-2");

    cell_8_4.classList.add("text-grey-dk-300");
    cell_8_4.classList.add("creature-content-bg-dark");
    cell_8_4.classList.add("fs-2");

    cell_8_5.classList.add("text-grey-dk-300");
    cell_8_5.classList.add("creature-content-bg-dark");
    cell_8_5.classList.add("fs-2");

    cell_8_6.classList.add("text-grey-dk-300");
    cell_8_6.classList.add("creature-content-bg-dark");
    cell_8_6.classList.add("fs-2");
}

function generateTableDrops(table, data) {
    let row_1 = table.insertRow();
    let cell_drop = row_1.insertCell();
    cell_drop.classList.add("text-grey-dk-300");
    cell_drop.classList.add("creature-content-bg-light");
    cell_drop.rowSpan = data.drops.length;
    let drop_strong = document.createElement("strong");
    drop_strong.appendChild(document.createTextNode("Drops:"));
    cell_drop.appendChild(drop_strong);
    let cell_d1 = row_1.insertCell();
    cell_d1.classList.add("text-grey-dk-300");
    cell_d1.classList.add("creature-content-bg-light");
    cell_d1.colSpan = "5";
    let drop_str_1 = "";
    if (data.drops[0].quantity || 0 !== data.drops[0].quantity.length)
        drop_str_1 += data.drops[0].quantity + "x ";
    drop_str_1 += data.drops[0].name;
    if (data.drops[0].rank || 0 !== data.drops[0].rank.length)
        drop_str_1 += " (" + data.drops[0].rank + ")";
    cell_d1.appendChild(document.createTextNode(drop_str_1));
    let drops_sup = data.drops.slice(1);
    for (let element of drops_sup) {
        let row = table.insertRow();
        let cell_d = row.insertCell();
        cell_d.classList.add("text-grey-dk-300");
        cell_d.classList.add("creature-content-bg-light");
        cell_d.colSpan = "5";
        let drop_str = "";
        if (element.quantity || 0 !== element.quantity.length)
            drop_str += element.quantity + "x ";
        drop_str += element.name;
        if (element.rank || 0 !== element.rank.length)
            drop_str += " (" + element.rank + ")";
        cell_d.appendChild(document.createTextNode(drop_str));
    }
}

function buildTable() {

    document.getElementById("result_infos").innerHTML = "";

    let data = fetchTableData();
    console.log(data);
    if (fetchTableData.hasError === true)
        return;
    let div_table = document.querySelector("#built-table");
    div_table.innerHTML = "";
    let newTable = document.createElement("table");
    newTable.classList.add("creature-table");
    div_table.appendChild(newTable);
    let table = div_table.querySelector("table");
    generateTableHead(table, data);
    generateTableBodyStats(table, data);
    generateTableNormalAttack(table, data);
    generateTableAbilities(table, data);
    generateTableDefaultWeapon(table, data);
    generateTablePassives(table, data);
    generateTableTraits(table, data);
    if (data.drops != null)
        generateTableDrops(table, data);
    
    let div_code = document.querySelector("#built-table-code");
    let code = div_code.querySelector("code");
    code.innerHTML = "";
    code.appendChild(document.createTextNode(process(table.outerHTML)));
}

function copyTableToClipboard() {
    let div_code = document.querySelector("#built-table-code");
    let copyText = div_code.querySelector("code");

    var textArea = document.createElement("textarea");
    textArea.value = copyText.innerText;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    try {
        var successful = document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function process(str) {

    var div = document.createElement('div');
    div.innerHTML = str.trim();

    return format(div, 0).innerHTML;
}

function format(node, level) {

    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter  = new Array(level - 1).join('  '),
        textNode;

    for (var i = 0; i < node.children.length; i++) {

        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}