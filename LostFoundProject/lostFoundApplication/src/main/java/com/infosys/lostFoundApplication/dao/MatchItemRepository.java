package com.infosys.lostFoundApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.lostFoundApplication.bean.MatchItem;
import com.infosys.lostFoundApplication.bean.MatchItemId;

public interface MatchItemRepository extends JpaRepository<MatchItem,MatchItemId>{

}
