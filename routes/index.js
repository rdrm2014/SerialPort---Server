/**
 * Created by ricardomendes on 15/03/15.
 */
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ISAQUA' });
};