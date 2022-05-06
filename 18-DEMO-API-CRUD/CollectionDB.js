class CollectionDB{
    constructor(collectionName){
        this.collectionName = collectionName;
        this.maBD = new Map()
        this.id = 0;
    }
    insert(obj){
        this.maBD.set(this.id, obj);
        return {id : this.id++, inserted : obj}
    }
    get(id){
        if(this.search(id)) return this.maBD.get(id)
        else throw new Error(`L'id ${id} n'existe pas !`)
    }
    search(id){
        return this.maBD.has(id)
    }
    update(id, obj){
        if(this.search(id)) this.maBD.set(id, obj)
        else throw new Error(`L'id ${id} n'existe pas !`)
    }
    delete(id){
        if(this.search(id)) this.maBD.delete(id)
        else throw new Error(`L'id ${id} n'existe pas !`)
    }
    all(){ return Object.fromEntries(this.maBD) }
    searchByProperty(propertyName, value){
        let result = false;
        this.maBD.forEach((obj, index) => {
            if(!result){
                if(propertyName in obj && obj[propertyName] === value) result = {id : id, found : obj}
            }
        })
        return result || {};
    }
}
module.exports = CollectionDB