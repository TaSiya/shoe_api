module.exports = function (pool) {
    async function allShoes() {
        let result = await pool.query('select * from shoes');
        return result.rows;
    }
    
    return {
        allShoes
    }
}