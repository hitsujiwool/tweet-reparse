
module.exports = function(tweet, types) {

  // reparse all entities by default
  types = types || Object.keys(builder);

  var entities = [];

  for (var key in tweet.entities) {
    tweet.entities[key].forEach(function(entity) {
      // ignore unsupported entity type
      if (!~types.indexOf(key)) return;
      entities.push({ type: key, info: entity });
    });
  }
  
  // for replacing the text from right to left, keeping indices information
  entities = entities.sort(function(a, b) {
    return b.info.indices[0] - a.info.indices[0];
  });

  return entities.reduce(function(res, entity) {
    var type = entity.type;
    var info = entity.info;
    return res.slice(0, info.indices[0]) + builder[type](info) + res.slice(info.indices[1]);
  }, tweet.text);
};

var entryPoint = 'https://twitter.com/';

var builder = {
  urls: function(info) {
    return '<a href="' + info.expanded_url + '">' + info.url + '</a>';
  },

  hashtags: function(info) {
    return '<a href="' + entryPoint + 'search?q=%23' + info.text + '&src=hash">#' + info.text + '</a>';
  },

  user_mentions: function(info) {
    return '<a href="' + entryPoint + info.screen_name + '">@' + info.screen_name + '</a>';
  }
};
