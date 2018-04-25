// https://gist.github.com/phortx/1a6d24c0e379e1490a285fa7f985d187
import { Model as ORMModel } from "@vuex-orm/core";

import inflection from "inflection";

import * as api from "../firebase-service";

/**
 * Wrapper for models to provide model level convenience methods for interacting with the store and persistence.
 * Also provides a very simple revert() implementation.
 *
 * Will be built into vuex-orm in the future. See https://github.com/vuex-orm/vuex-orm/issues/60
 *
 * Requires the inflected npm package.
 */
export default class Model extends ORMModel {
  /**
   * Saves the current snapshot of the properties when calling $saveSnapshot()
   */
  $snapshot = {};

  /**
   * Helper method to return the singular name of the entity
   */
  static singularEntity() {
    return inflection.singularize(this.entity);
  }

  /**
   * Helper method which creates a Vuex-ORM query object containing all relations.
   */
  static buildQuery() {
    let query = this.getters("query")();

    this.getRelations().forEach(relation => {
      query = query.with(relation);
    });

    return query;
  }

  /**
   * Helper method, that returns all relations
   */
  static getRelations() {
    const fields = this.fields();
    return Object.keys(fields).filter(
      n => fields[n].constructor.name !== "Attr"
    ); // FIXME This won't work in production!
  }

  /**
   * Load records from server
   * @param filter id or filter object
   * @param bypassCache
   */
  static async fetch(filter, bypassCache = false) {
    if (typeof filter !== "object") filter = { id: filter };
    return this.dispatch("fetch", { filter, bypassCache });
  }

  /**
   * Get all records from vuex store
   */
  static findAll() {
    let query = this.buildQuery();
    return query.all();
  }

  /**
   * Get all records from vuex store with  filter
   */
  static where(filter) {
    let query = this.buildQuery();
    return query.where(filter);
  }

  /**
   * Find single record from vuex store
   * @param id
   */
  static find(id) {
    const query = this.buildQuery();
    return query.where("id", id).find();
  }

  /**
   * Get the first record form the vuex store
   */
  static first() {
    let query = this.buildQuery();
    return query.first();
  }

  /**
   * Get the last record form the vuex store
   */
  static last() {
    let query = this.buildQuery();
    return query.last();
  }

  /**
   * Deletes all records from server
   * @returns {Promise<void>}
   */
  static async destroyAll() {
    return this.dispatch("destroyAll");
  }

  /**
   * Deletes all from vuex store
   */
  static async deleteAll() {
    return this.dispatch("deleteAll");
  }

  /**
   * Create object in vuex store
   * @param data
   */
  static async create(data) {
    return api.createObject(this.singularEntity(), data).then(_response => {
      let r = {
        ...data,
        $id: _response.id,
        id: _response.id
      };
      debugger;
      return this.dispatch("insert", { data: r });
    });
  }

  /**
   * Alias for create
   */
  static async insert(data) {
    return this.create(data);
  }

  /**
   * Calls delete and destroy.
   * @returns {Promise<void>}
   */
  async deleteAndDestroy() {
    await this.delete();
    return this.destroy();
  }

  /**
   * Delete from server
   * @returns {Promise<void>}
   */
  async destroy() {
    return this.$dispatch("destroy", { id: this.id });
  }

  /**
   * Delete from vuex store
   */
  async delete() {
    return this.$dispatch("delete", this.id);
  }

  /**
   * Saves a snapshot of the property values of this record to allow reverting to this snapshot later.
   */
  $saveSnapshot() {
    this.$snapshot = this.$toJson();
  }

  /**
   * Reverts the records property values to the last taken snapshot.
   * @returns {Promise<void>}
   */
  async $revert() {
    Object.keys(this.$snapshot).forEach(key => {
      const value = this.$snapshot[key];
      if (key !== "$snapshot" && typeof value !== "object") {
        this[key] = value;
      }
    });

    await this.save();
  }

  /**
   * Alias for update
   */
  async save() {
    return this.update();
  }

  /**
   * Update vuex store
   */
  async update() {
    return this.$dispatch("update", { where: this.id, data: this });
  }

  /**
   * Saves a new object to the server
   * @returns {Promise<void>}
   */
  async persist(args = {}) {
    return this.$dispatch("persist", { id: this.id, args });
  }

  /**
   * Saves an update to the server
   * @returns {Promise<void>}
   */
  async push(args = {}) {
    return this.$dispatch("push", { data: this, args });
  }

  /**
   * Runs a non-CURD mutation against the server
   * @returns {Promise<void>}
   */
  static async mutate(name, args) {
    args["mutation"] = name;
    return this.dispatch("mutate", args);
  }
}
