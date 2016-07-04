// huffman算法
module.exports = {
    getCharCount: getCharCount,
    getCharOrder: getCharOrder,
    buildTree: buildTree,
    trimTree: trimTree,
    assignCodes: assignCodes,
    encode: encode
};
// 获取字符出现的频率
function getCharCount(str) {
    return str.split('').reduce(function (acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});
}
// 字符出现次数的排序
function getCharOrder(freqs) {
    var letters = [];
    for (var ch in freqs) {
        letters.push([freqs[ch], ch]);
    }
    return letters.sort();
}
//构建二叉树
function buildTree(letters) {
    while (letters.length > 1) {
        // 每次取前两个数组
        var leftNode = letters.slice(0, 2);
        var rightNode = letters.slice(2, letters.length);
        // 获取左右元素的总共频率
        var combfreq = leftNode[0][0] + leftNode[1][0];
        letters = rightNode;
        var two = [combfreq, leftNode];
        //新的频率，对应的新的节点
        letters.push(two);
        //按照新的频率排序
        letters.sort();
    }
    return letters[0];
}
function trimTree(tree) {
    var p = tree[1];
    if (typeof p === 'string') {
        return p;
    } else {
        return [trimTree(p[0]), trimTree(p[1])];
    }
}
var codes = {};
function assignCodes(node, pat) {
    pat = pat || "";
    if (typeof (node) == typeof ("")) {
        codes[node] = pat;
    } else {
        assignCodes(node[0], pat + "0");
        assignCodes(node[1], pat + "1");
    }
    return codes;
}
// 编码
function encode(tpl) {
    var freqs = getCharCount(tpl);
    var orders = getCharOrder(freqs);
    var tree = buildTree(orders);
    var nodes = trimTree(tree);
    var codes = assignCodes(nodes);
    var output = "";
    for (var key in codes) {
        output += codes[key];
    }
    return output;
}