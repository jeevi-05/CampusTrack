package com.infosys.lostFoundApplication.dao;

import java.util.List;

import com.infosys.lostFoundApplication.bean.MatchItem;

public interface MatchItemDao {
	public void saveMatchItem(MatchItem matchItem);
	public List<MatchItem> getAllMatchItems();

}
